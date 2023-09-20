import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

class PasswordHelper {
  public comparePasswordAndConfirmation(password: string, confirmation: string): boolean {
    return password === confirmation;
  }

  public comparePasswordAndHash(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }

  public generate(): string {
    return crypto.randomBytes(12).toString('hex').slice(0, 8);
  }

  public hash(password: string): string {
    const salt = bcryptjs.genSaltSync(8);
    return bcryptjs.hashSync(password, salt);
  }
}

export default new PasswordHelper();
