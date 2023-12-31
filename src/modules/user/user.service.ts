import Repository from './user.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import PasswordHelper from '@helpers/password.helper';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

class Service {
  public async findAll(limit: number, page: number, userId: number, search?: string) {
    const users = await Repository.findAll(limit, page, userId, search);

    return PaginationHelper.paginate(users, limit, page);
  }

  public async findAllNoPagination(userId: number, search?: string) {
    return await Repository.findAllNoPagination(userId, search);
  }

  public async findOne(id: number) {
    const user = await Repository.findOne(id);

    if (!user) {
      throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  public async createOne(data: CreateUserDto, image?: Express.Multer.File) {
    // check for unique fields.
    await this.checkUniqueFields(data.email);

    // retrieve image url.
    const imageUrl = image ? image.location : null;

    // hash password.
    data.password = PasswordHelper.hash(data.password);

    return await Repository.createOne({ ...data, imageUrl });
  }

  public async updateOne(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);

    // check unique fields.
    await this.checkUniqueFieldsExcludingMyself(id, data.email);

    return await Repository.updateOne(user.id, data);
  }

  public async deleteOne(id: number) {
    const user = await this.findOne(id);

    return await Repository.deleteOne(user.id);
  }

  public async checkUniqueFields(email: string) {
    const account = await Repository.findByUniqueFields(email);

    if (account) {
      throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }

  public async checkUniqueFieldsExcludingMyself(id: number, email: string) {
    const account = await Repository.findByUniqueFields(email);

    if (account && account.id !== id) {
      throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
  }
}

export default new Service();
