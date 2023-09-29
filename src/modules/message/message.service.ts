import Repository from './message.repository';

import ChatService from 'modules/chat/chat.service';

import { Prisma } from '@prisma/client';
import { CreateMessageDto } from './dtos/create-message.dto';

class Service {
  public async getAll(userOne: number, userTwo: number) {
    const chat = await ChatService.findOneByUsersIds(userOne, userTwo);

    return await Repository.findAll(chat.id);
  }

  public async createOne(data: CreateMessageDto, userId: number) {
    const chat = await ChatService.checkIfUserBelongsToChat(data.chatId, userId);

    const body: Prisma.MessageCreateInput = {
      content: data.content,
      chat: {
        connect: { id: chat.id },
      },
      sentBy: {
        connect: { id: userId },
      },
    };

    return await Repository.createOne(body, chat.id);
  }
}

export default new Service();
