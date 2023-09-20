import Service from './message.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body, req.auth.id);
    res.status(201).json(result);
  }
}

export default new Controller();
