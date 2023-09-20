import { IPayloadDto } from '../modules/auth/dtos/payload.dto';
import { Strategy } from 'passport-jwt';
import passport from 'passport';
import passportOptions from '@config/passport';

passport.use(
  new Strategy(passportOptions, (payload: IPayloadDto, done) => {
    done(null, payload);
  }),
);

export default passport;
