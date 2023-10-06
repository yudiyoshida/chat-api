import Repository from './message.repository';

import ChatService from 'modules/chat/chat.service';

import { Prisma } from '@prisma/client';
import { CreateMessageDto } from './dtos/create-message.dto';

class Service {
  public async getAll(chatId: number, userId: number) {
    const chat = await ChatService.findById(chatId, userId);

    return await Repository.findAll(chat.id);
  }

  public async createOne(data: CreateMessageDto, userId: number) {
    const { chatId, content } = data;
    const chat = await ChatService.findById(chatId, userId);

    const body: Prisma.MessageCreateInput = {
      content: content,
      chat: {
        connect: { id: chat.id },
      },
      sentBy: {
        connect: { id: userId },
      },
    };

    await Repository.createOne(body);
    return await Repository.findAll(chatId);
  }
}

export default new Service();
