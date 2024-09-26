import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Vinayak', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'vinayak', required: false })
  @IsOptional()
  @MinLength(6)
  password?: string;
}
