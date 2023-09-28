import Repository from './chat.repository';

import UserService from 'modules/user/user.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { ChatDto } from './dtos/chat.dto';

class Service {
  public async findOneByIdAndUserId(id: number, loggedUserId: number) {
    const chat = await Repository.findOneByIdAndUserId(id, loggedUserId);

    if (!chat) {
      throw new AppException(404, ErrorMessages.CHAT_NOT_FOUND);
    }
    return this.formatResponse(chat, loggedUserId);
  }

  public async findOneByUsersIds(targetUserId: number, loggedUserId: number) {
    // check if target user (user that the logged user wants to start a conversation) exists.
    const targetUser = await UserService.findOne(targetUserId);

    // search for chat.
    const chat = await Repository.findOneByUsersIds(targetUser.id, loggedUserId);

    if (!chat) {
      const newChat = await this.createOne(targetUser.id, loggedUserId);
      return this.formatResponse(newChat, loggedUserId);
    }
    return this.formatResponse(chat, loggedUserId);
  }

  public formatResponse(chat: ChatDto, loggedUserId: number) {
    const { users, ...data } = chat;

    const me = users.find(user => user.id === loggedUserId);
    const others = users.filter(user => user.id !== loggedUserId);

    return {
      ...data,
      users: { me, others },
    };
  }

  private async createOne(userOne: number, userTwo: number) {
    if (userOne === userTwo) {
      throw new AppException(400, ErrorMessages.CANNOT_CHAT_WITH_YOURSELF);
    }
    return await Repository.createOne(userOne, userTwo);
  }
}

export default new Service();
