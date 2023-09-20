import CodeHelper from '../../../../src/shared/helpers/code.helper';

describe('generate method', () => {
  test('it should return a code of type string', () => {
    const { code } = CodeHelper.generate(0);

    expect(typeof code).toBe('string');
  });

  test('it should return a code with length equals 4', () => {
    const { code } = CodeHelper.generate(0);

    expect(code).toHaveLength(4);
  });

  test('it should return a string code that contains only numbers', () => {
    const { code } = CodeHelper.generate(0);

    expect(Number(code)).not.toBeNaN();
  });

  test('it should return a codeExpiresIn of type date', () => {
    const { codeExpiresIn } = CodeHelper.generate(0);

    expect(codeExpiresIn).toBeInstanceOf(Date);
  });

  test('it should return a code that expires in 10 minutes', () => {
    const { codeExpiresIn } = CodeHelper.generate(10);
    const now = new Date();
    const tenMinutesLater = new Date(now.setMinutes(now.getMinutes() + 10));

    expect(codeExpiresIn.getMinutes()).toBe(tenMinutesLater.getMinutes());
  });
});


describe('isExpired method', () => {
  test('it should return false when sending a future date', () => {
    const now = new Date();
    const futureDate = new Date(now.setMinutes(now.getMinutes() + 10));

    expect(CodeHelper.isExpired(futureDate)).toBe(false);
  });

  test('it should return true when sending the current date', () => {
    const now = new Date();

    expect(CodeHelper.isExpired(now)).toBe(true);
  });

  test('it should return true when sending a past date)', () => {
    const now = new Date();
    const pastDate = new Date(now.setMinutes(now.getMinutes() - 10));

    expect(CodeHelper.isExpired(pastDate)).toBe(true);
  });
});
