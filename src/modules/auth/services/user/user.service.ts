import Repository from './user.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { IPayloadDto } from '../../dtos/payload.dto';
import { LoginDto } from '../../dtos/login.dto';

import JwtHelper from '@helpers/token.helper';
import PasswordHelper from '@helpers/password.helper';

class Service {
  public async loginUser(data: LoginDto) {
    // find user.
    const user = await this.findByCredential(data.credential);

    // compare password.
    this.comparePasswords(data.password, user.password);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    return { token: JwtHelper.createToken(payload) };
  }

  private comparePasswords(password: string, hash: string) {
    const isMatch = PasswordHelper.comparePasswordAndHash(password, hash);
    if (!isMatch) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
  }

  private async findByCredential(credential: string) {
    const user = await Repository.findByCredential(credential);

    if (!user) {
      throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    }
    return user;
  }
}

export default new Service();
