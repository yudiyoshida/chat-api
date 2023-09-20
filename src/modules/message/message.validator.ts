import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateMessage } from './dtos/create-message.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateMessage);
  };
}

export default new Validator();
