import AppException from '@errors/app-exception';
import { NextFunction, Request, Response } from 'express';

export function TryCatch() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      try {
        await originalMethod.call(this, req, res, next);

      } catch (err: any) {
        next(new AppException(err.status ?? 500, err.message));

      }
    };

    return descriptor;
  };
}
