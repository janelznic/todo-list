import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Connection } from './connection.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john.doe', description: 'Username' })
  @Column({ unique: true, length: 60 })
  username: string;

  @ApiProperty({ example: 'john.doe@gmail.com', description: 'E-mail' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'aaa', description: 'Password' })
  @Column({ length: 255, select: false })
  password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @OneToMany(() => Connection, (connection) => connection.connectedUser)
  connections: Connection[];

  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
