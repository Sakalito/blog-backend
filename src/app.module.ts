import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/shared/modules/prisma/prisma.module';

import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PostsModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
