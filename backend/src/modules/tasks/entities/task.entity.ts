import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Make me happy', description: 'Text' })
  @Column({ name: 'text', length: 255 })
  text: string;

  @ApiProperty({ description: 'Completed' })
  @Column({ name: 'completed' })
  completed: boolean;
}
