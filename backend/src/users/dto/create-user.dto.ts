import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

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
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(8, 500)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  userType: string;
}
