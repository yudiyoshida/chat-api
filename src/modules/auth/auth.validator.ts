import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';

class Validator extends BaseValidator {
  public login: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', Login);
  };
}

export default new Validator();
