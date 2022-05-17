import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    // orderBy?: Prisma.PostWithRelationInput;
  }): Promise<Post[] | undefined> {
    const { skip, take, cursor, where } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      // orderBy,
    });
  }

  async findOnePost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({ where: postWhereUniqueInput });
  }

  async createPost(
    user: Prisma.PostCreateInput,
  ): Promise<Post | undefined> {
    return this.prisma.post.create({
      data: user,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;

    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(
    where: Prisma.PostWhereUniqueInput,
  ): Promise<Post | undefined> {
    return this.prisma.post.delete({
      where,
    });
  }
}
