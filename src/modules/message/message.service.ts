import Repository from './message.repository';

import { CreateMessageDto } from './dtos/create-message.dto';
import { Prisma } from '@prisma/client';
import chatService from 'modules/chat/chat.service';

class Service {
  public async createOne(data: CreateMessageDto, userId: number) {
    const chat = await chatService.findOneByIdAndUserId(data.chatId, userId);

    const body: Prisma.MessageCreateInput = {
      content: data.content,
      chat: {
        connect: { id: chat.id },
      },
      user: {
        connect: { id: userId },
      },
    };

    return await Repository.createOne(body);
  }
}

export default new Service();
