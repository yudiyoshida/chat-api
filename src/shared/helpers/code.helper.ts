import crypto from 'crypto';

class CodeHelper {
  public generate(minutes: number): { code: string, codeExpiresIn: Date } {
    const now = new Date();

    // generates random number between 0000 and 9999.
    const code = crypto.randomInt(10000).toString().padStart(4, '0');
    const codeExpiresIn = new Date(now.setMinutes(now.getMinutes() + minutes));

    return { code, codeExpiresIn };
  }

  public isExpired(codeExpiresIn: Date): boolean {
    const now = new Date();
    return (codeExpiresIn.getTime() - now.getTime() <= 0);
  }
}

export default new CodeHelper();
