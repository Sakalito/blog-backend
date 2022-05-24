import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/shared/modules/prisma/prisma.module';

import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CreateController } from './create/create.controller';
import { GetController } from './get/get.controller';
import { PostsController } from './posts/posts.controller';
import { DeleteController } from './delete/delete.controller';
import { PatchController } from './patch/patch.controller';
import { ReadController } from './read/read.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PostsModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [
    AppController,
    CreateController,
    GetController,
    PostsController,
    DeleteController,
    PatchController,
    ReadController,
  ],
  providers: [AppService],
})
export class AppModule {}
