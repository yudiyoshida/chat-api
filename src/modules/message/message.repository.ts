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

  public createOne(data: Prisma.MessageCreateInput, chatId: number) {
    return DataSource.$transaction(async(tx) => {
      await tx.message.create({
        data,
        select: MessageDto,
      });

      return await tx.message.findMany({
        where: { chatId },
        orderBy: { sentAt: 'desc' },
        select: MessageDto,
      });
    });
  }
}

export default new Repository();
