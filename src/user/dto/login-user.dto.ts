import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'vinayak@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'vinayak' })
  @IsNotEmpty()
  password: string;
}
