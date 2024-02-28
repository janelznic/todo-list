import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Make me happy',
    required: true
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  text: string;

  @ApiProperty()
  completed: boolean;
}
