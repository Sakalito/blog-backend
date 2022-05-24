import { Injectable } from '@nestjs/common';
import type { Post, Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/modules/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    if (!params) return await this.prisma.post.findMany();

    const { skip, take, cursor, where, orderBy } = params;

    return await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOnePost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async createPost(
    user: Prisma.PostCreateInput,
  ): Promise<Post | undefined> {
    return await this.prisma.post.create({
      data: user,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;

    return await this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<Post | undefined> {
    return await this.prisma.post.delete({
      where,
    });
  }
}
