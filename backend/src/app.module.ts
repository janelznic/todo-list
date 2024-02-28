import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { VersionModule } from './modules/version/version.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    TasksModule,
    UsersModule,
    VersionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         {
//           path: '/users',
//           method: RequestMethod.POST,
//         },
//         {
//           path: '/users/login',
//           method: RequestMethod.POST,
//         },
//         {
//           path: '/version',
//           method: RequestMethod.GET,
//         },
//       )
//       .forRoutes('');
//   }
// }
