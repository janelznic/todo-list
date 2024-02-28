import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserI } from '../users.interfaces';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class DtoHelperService {
  createUserDtoToEntity(createUserDto: CreateUserDto): UserI {
    return {
      email: createUserDto.email,
      password: createUserDto.password,
      username: createUserDto.username,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName
    };
  }

  loginUserDtoToEntity(loginUserDto: LoginUserDto): UserI {
    return {
      email: loginUserDto.email,
      password: loginUserDto.password,
    };
  }
}
