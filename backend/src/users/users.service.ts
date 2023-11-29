import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserInfos } from 'src/decorators/user.decorators';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Create a new user and return a JWT token
   * @param createUserDto The user to create
   * @returns The JWT token
   */
  async create(createUserDto: CreateUserDto): Promise<string> {
    const user = this.usersRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 8),
    });

    const existingUser = await this.usersRepository.findBy({
      email: user.email,
    });
    if (existingUser.length > 0)
      throw new ForbiddenException(['Email already used']);

    const newUser = await this.usersRepository.save(user);

    const token = await this.authService.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    delete newUser.password;

    return token.access_token;
  }

  /**
   * Find all users
   * @param inputQuery The query to filter users
   * @returns The users found
   * @example
   * [return all users]
   * findAll()
   * @example
   * [return all users with name containing 'John']
   * findAll({ name: 'John' })
   */
  async findAll(inputQuery: ObjectLiteral): Promise<User[]> {
    const qb = this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email']);

    if (!!inputQuery.name)
      qb.where('user.name LIKE :name', { name: `%${inputQuery.name}%` });
    if (!!inputQuery.email)
      qb.andWhere('user.email LIKE :email', { email: `%${inputQuery.email}%` });

    const users = await qb.getMany();

    return users;
  }

  /**
   * Find one user by id
   * @param id The id of the user to find
   * @returns The user found
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findBy({ email });

    return user[0];
  }

  /**
   * Find one user by id
   * @param id The id of the user to find
   * @returns The user found
   */
  async update(updateUserDto: UpdateUserDto, user: IUserInfos) {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (!userToUpdate) throw new ForbiddenException(['User not found']);

    if (updateUserDto.password)
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 8);

    const updatedUser = await this.usersRepository.save({
      ...userToUpdate,
      ...updateUserDto,
      id: user.id,
    });

    return updatedUser;
  }
}
