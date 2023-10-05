import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { MessageDto } from './dtos/message.dto';

class Repository {
  constructor(private readonly repository = DataSource.message) {}

  public findAll(chatId: number) {
    return this.repository.findMany({
      where: { chatId },
      orderBy: { sentAt: 'desc' },
      select: MessageDto,
    });
  }

  public createOne(data: Prisma.MessageCreateInput) {
    return this.repository.create({
      data,
      select: MessageDto,
    });
  }
}

export default new Repository();
