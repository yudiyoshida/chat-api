import Service from './chat.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const result = await Service.findAll(req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findById(req: Request, res: Response) {
    const result = await Service.findById(+req.params.id, req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body, req.auth.id);
    res.status(201).json(result);
  }
}

export default new Controller();
