import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateUser } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateUser);
  };

  public updateMyself: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateUser);
  };
}

export default new Validator();
