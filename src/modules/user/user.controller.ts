import Service from './user.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const { limit, page, search } = req.query as RequestQueryDto;

    const result = (page && limit)
      ? await Service.findAll(limit, page, search)
      : await Service.findAllNoPagination(search);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findMyself(req: Request, res: Response) {
    const result = await Service.findOne(req.auth.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body, req.file);
    res.status(201).json(result);
  }

  @TryCatch()
  public async updateMyself(req: Request, res: Response) {
    const result = await Service.updateOne(req.auth.id, req.body);
    res.status(200).json(result);
  }

  @TryCatch()
  public async deleteMyself(req: Request, res: Response) {
    const result = await Service.deleteOne(req.auth.id);
    res.status(200).json(result);
  }
}

export default new Controller();
