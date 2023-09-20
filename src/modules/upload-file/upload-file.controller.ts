import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async upload(req: Request, res: Response) {
    const url = req.file?.location ?? null;
    res.status(200).json({ url });
  }
}

export default new Controller();
