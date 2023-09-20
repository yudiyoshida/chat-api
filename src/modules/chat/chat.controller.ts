import Service from './chat.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOneByUsersIds(+req.params.id, req.auth.id);
    res.status(200).json(result);
  }
}

export default new Controller();
