import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'aaa',
    required: true
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  readonly password: string;
}
