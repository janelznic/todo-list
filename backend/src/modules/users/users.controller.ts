import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { ApiExtension, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DtoHelperService } from './dto/dto-helper.service';
import { User } from './entities/user.entity';
import { LoginResponseI, UserI } from './users.interfaces';
import { LoginUserDto } from './dto/login-user.dto';

const errorNotFound = (error, str) => {
  throw new HttpException({
    statusCode: HttpStatus.NOT_FOUND,
    message: `User ${str} not found`,
  }, HttpStatus.NOT_FOUND, {
    cause: error
  });
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private dtoHelperService: DtoHelperService,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI = await this.dtoHelperService.createUserDtoToEntity(
      createUserDto,
    );
    return this.usersService.create(userEntity);
  }

  @ApiOperation({ summary: 'List all users' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by Id' })
  @Get('/id/:id')
  async findById(@Param('id') id: string) {
    try {
      const user: UserI = await this.usersService.getOneById(+id);
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) { 
      errorNotFound(error, id);
    }
  }

  @ApiOperation({ summary: 'Get user by username' })
  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    try {
      const user: User = await this.usersService.findByUsername(username);
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) { 
      errorNotFound(error, username);
    }
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user: UserI = await this.usersService.getOneById(+id);
      if (user) {
        await this.usersService.remove(+id);
        return {
          statusCode: HttpStatus.OK,
          message: `User ${user.username} successfully removed.`
        }
      }
      throw new NotFoundException();
    } catch (error) { 
      errorNotFound(error, id);
    }
  }

  @ApiOperation({ summary: 'Login user by email and password' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
    const userEntity: UserI = await this.dtoHelperService.loginUserDtoToEntity(
      loginUserDto,
    );
    const jwt: string = await this.usersService.login(userEntity);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000,
    };
  }
}
