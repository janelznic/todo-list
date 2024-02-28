import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DtoHelperService } from './dto/dto-helper.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService, DtoHelperService],
  exports: [UsersService]
})
export class UsersModule {}
