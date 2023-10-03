import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateChat } from './dtos/create-chat.dto';

class Validator extends BaseValidator {
  public create: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateChat);
  };
}

export default new Validator();
