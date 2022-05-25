import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import type { Post as PostModel } from '@prisma/client';

import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel | null> {
    return await this.postsService.findOnePost({ id });
  }

  @Get()
  async getAll(): Promise<PostModel[]> {
    return await this.postsService.findAllPosts();
  }

  @Get('filter/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return await this.postsService.findAllPosts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createDraft(
    @Body()
    postData: {
      title: string;
      description: string;
      content: string;
      createdAt?: Date;
      authorEmail?: string;
    },
  ): Promise<PostModel | undefined> {
    const { title, description, content } = postData;

    return await this.postsService.createPost({
      title,
      description,
      content,
    });
  }

  @Patch('publish/:id')
  async publishPost(
    @Param('id') id: string,
    @Body() dto: { title: string; description: string; content: string },
  ): Promise<PostModel> {
    return await this.postsService.updatePost({
      where: { id },
      data: {
        published: true,
        content: dto.content,
        title: dto.title,
        description: dto.description,
      },
    });
  }

  @Delete('post/:id')
  async deletePost(
    @Param('id') id: string,
  ): Promise<PostModel | undefined> {
    return await this.postsService.deletePost({ id });
  }
}
