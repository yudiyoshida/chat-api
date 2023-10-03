import Repository from './chat.repository';

import UserService from 'modules/user/user.service';

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

  public async create(data: CreateChatDto, userId: number) {
    const { ids, ...body } = data;

    // check is users' ids exists.
    await this.checkIfUsersExists(ids);

    if (ids.length === 1) {
      // await this.checkIfPrivateChatAlreadyExists(userId, ids[0].id);
    }
    ids.push({ id: userId });

    const newChat = await Repository.createOne(body, ids);
    return this.formatResponse(newChat, userId);
  }

  // private async checkIfPrivateChatAlreadyExists(userOne: number, userTwo: number) {
  //   const chat = await Repository.findOneByUsersId(userOne, userTwo);
  //   console.log(chat);
  //   if (chat) {
  //     throw new AppException(409, ErrorMessages.CHAT_ALREADY_EXISTS);
  //   }
  // }

  private async checkIfUsersExists(ids: Array<{ id: number }>) {
    const arrayOfIds = ids.map(item => item.id); // { id: number }[] => number[];

    await Promise.all(
      arrayOfIds.map(async(id) => await UserService.findOne(id)),
    );
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
