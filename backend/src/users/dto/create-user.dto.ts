import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 500)
  password: string;
}
