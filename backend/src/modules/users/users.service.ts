import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../../auth/services/auth.service';
import { UserI } from './users.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(newUser: UserI): Promise<UserI> {
    const emailExists: boolean = await this.mailExists(newUser.email);
    const usernameExists: boolean = await this.usernameExists(newUser.username);

    if (emailExists === false && usernameExists === false) {
      const passwordHash: string = await this.authService.hashPassword(
        newUser.password,
      );
      newUser.password = passwordHash;
      newUser.email = newUser.email.toLowerCase();
      newUser.username = newUser.username.toLowerCase();

      const user = await this.usersRepository.save(
        this.usersRepository.create(newUser),
      );

      return this.findOne(user.id);
    } else {
      throw new HttpException({
        statusCode: HttpStatus.CONFLICT,
        message: `User ${newUser.username} already exists`,
      }, HttpStatus.CONFLICT
      );
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  private async findByEmail(email: string): Promise<UserI> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'username'],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  private async findOne(id: number): Promise<UserI> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async getOneById(id: number): Promise<UserI> {
    return this.usersRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async login(user: UserI): Promise<string> {
    const foundUser: UserI = await this.findByEmail(user.email);

    if (foundUser) {
      const passwordsMatching: boolean =
        await this.authService.comparePasswords(
          user.password,
          foundUser.password,
        );

      if (passwordsMatching === true) {
        const payload: UserI = await this.findOne(foundUser.id);
        return this.authService.generateJwt(payload);
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentils',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return !!user;
  }

  private async usernameExists(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    return !!user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
