import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({
    example: 'admin',
    required: true
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  username: string;

  @ApiProperty({
    example: 'John',
    required: true
  })
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: true
  })
  @MaxLength(50)
  lastName: string;
}
