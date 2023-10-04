import DataSource from '@database/data-source';

import { ChatDto } from './dtos/chat.dto';
import { Prisma } from '@prisma/client';

class Repository {
  constructor(private readonly repository = DataSource.chat) {}

  public findAll(userId: number) {
    return this.repository.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      select: ChatDto,
      orderBy: { updatedAt: 'desc' },
    });
  }

  public findOneByIdAndUserId(id: number, userId: number) {
    return this.repository.findFirst({
      where: {
        id,
        users: {
          some: { id: userId },
        },
      },
      select: ChatDto,
    });
  }

  public createOne(
    data: Prisma.ChatCreateWithoutUsersInput,
    users: Prisma.UserWhereUniqueInput[],
  ) {
    return this.repository.create({
      data: {
        name: data.name,
        users: {
          connect: users,
        },
      },
      select: ChatDto,
    });
  }
}

export default new Repository();
