import Repository from './chat.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { ChatDto } from './dtos/chat.dto';
import { CreateChatDto } from './dtos/create-chat.dto';

class Service {
  public async findAll(userId: number) {
    return await Repository.findAll(userId);
  }

  public async findById(id: number, userId: number) {
    const chat = await Repository.findOneByIdAndUserId(id, userId);

    if (!chat) {
      throw new AppException(404, ErrorMessages.CHAT_NOT_FOUND);
    }
    return this.formatResponse(chat, userId);
  }

  public async create(users: CreateChatDto, userId: number) {
    users.ids.push({ id: userId });

    const newChat = await Repository.createOne(users.ids);
    return this.formatResponse(newChat, userId);
  }

  private formatResponse(chat: ChatDto, loggedUserId: number) {
    const { users, ...data } = chat;

    const me = users.find(user => user.id === loggedUserId);
    const others = users.filter(user => user.id !== loggedUserId);

    return {
      ...data,
      users: { me, others },
    };
  }
}

export default new Service();
