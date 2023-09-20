import jwt from 'jsonwebtoken';
import { IPayloadDto } from '../../modules/auth/dtos/payload.dto';

class JwtHelper {
  public createToken(payload: IPayloadDto): string {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }
}

export default new JwtHelper();
