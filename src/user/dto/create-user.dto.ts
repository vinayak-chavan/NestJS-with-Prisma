import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Vinayak' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'vinayak@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'vinayak' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
