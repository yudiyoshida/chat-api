import Repository from './message.repository';

import ChatService from 'modules/chat/chat.service';

import { CreateMessageDto } from './dtos/create-message.dto';
import { Prisma } from '@prisma/client';

class Service {
  public async getAll(userOne: number, userTwo: number) {
    const chat = await ChatService.findOneByUsersIds(userOne, userTwo);

    return await Repository.findAll(chat.id);
  }

  public async createOne(data: CreateMessageDto, userId: number) {
    const chat = await ChatService.findOneByIdAndUserId(data.chatId, userId);

    const body: Prisma.MessageCreateInput = {
      content: data.content,
      chat: {
        connect: { id: chat.id },
      },
      sentBy: {
        connect: { id: userId },
      },
    };

    return await Repository.createOne(body);
  }
}

export default new Service();
