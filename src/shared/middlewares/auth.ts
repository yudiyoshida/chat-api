import { Request, Response, NextFunction } from 'express';
import { AccountRole } from '@prisma/client';
import { IPayloadDto } from '../../modules/auth/dtos/payload.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import Passport from '@libs/passport';

class AuthMiddleware {
  public authentication(req: Request, res: Response, next: NextFunction) {
    Passport.authenticate('jwt', { session: false, failWithError: true },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: any, payload: IPayloadDto, info: any) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.auth = payload;
      },
    )(req, res, next);
    next();
  }

  public roles(...roles: AccountRole[]) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        if (!roles.includes(req.auth.role)) throw new Error();
        else next();

      } catch (err: any) {
        next(new AppException(403, ErrorMessages.FORBIDDEN));

      }
    };
  }
}

export default new AuthMiddleware();
