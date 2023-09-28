import DataSource from '@database/data-source';

import { ChatDto } from './dtos/chat.dto';

class Repository {
  constructor(private readonly repository = DataSource.chat) {}

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

  public findOneByUsersIds(userOne: number, userTwo: number) {
    return this.repository.findFirst({
      where: {
        users: {
          every: {
            id: { in: [userOne, userTwo] },
          },
        },
      },
      select: ChatDto,
    });
  }

  public createOne(userOne: number, userTwo: number) {
    return this.repository.create({
      data: {
        users: {
          connect: [{ id: userOne }, { id: userTwo }],
        },
      },
      select: ChatDto,
    });
  }
}

export default new Repository();
