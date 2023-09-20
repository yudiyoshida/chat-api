import Repository from './chat.repository';

import UserService from 'modules/user/user.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  public async findOneByIdAndUserId(id: number, loggedUserId: number) {
    const chat = await Repository.findOneByIdAndUserId(id, loggedUserId);

    if (!chat) {
      throw new AppException(404, ErrorMessages.CHAT_NOT_FOUND);
    }
    return chat;
  }

  public async findOneByUsersIds(targetUserId: number, loggedUserId: number) {
    // check if target user (user that the logged user wants to start a conversation) exists.
    const targetUser = await UserService.findOne(targetUserId);

    // search for chat.
    const chat = await Repository.findOneByUsersIds(targetUser.id, loggedUserId);

    if (!chat) {
      return this.createOne(targetUser.id, loggedUserId);
    }
    return chat;
  }

  private async createOne(userOne: number, userTwo: number) {
    if (userOne === userTwo) {
      throw new AppException(400, ErrorMessages.CANNOT_CHAT_WITH_YOURSELF);
    }
    return await Repository.createOne(userOne, userTwo);
  }
}

export default new Service();
