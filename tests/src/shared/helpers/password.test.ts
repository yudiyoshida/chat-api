import PasswordHelper from '../../../../src/shared/helpers/password.helper';

describe('comparePasswordAndConfirmation method', () => {
  test('compare two differents passwords should return false', () => {
    const isMatch = PasswordHelper.comparePasswordAndConfirmation('pass01', 'pass02');

    expect(isMatch).toBe(false);
  });

  test('compare two identical passwords should return true', () => {
    const isMatch = PasswordHelper.comparePasswordAndConfirmation('pass01', 'pass01');

    expect(isMatch).toBe(true);
  });
});


describe('comparePasswordAndHash method', () => {
  let hashPass01: string;
  let hashPass02: string;

  beforeAll(() => {
    hashPass01 = PasswordHelper.hash('pass01');
    hashPass02 = PasswordHelper.hash('pass02');
  });

  test('compare plain password and its hash should return true', () => {
    const isMatch = PasswordHelper.comparePasswordAndHash('pass01', hashPass01);

    expect(isMatch).toBe(true);
  });

  test('compare plain password and another password\'shash should return false', () => {
    const isMatch = PasswordHelper.comparePasswordAndHash('pass01', hashPass02);

    expect(isMatch).toBe(false);
  });
});


describe('generate method', () => {
  test('it should generate a random password with 8 characters', () => {
    const password = PasswordHelper.generate();

    expect(password.length).toBe(8);
  });
});


describe('hash method', () => {
  test('it should hash the password', () => {
    const password = 'plainPassword';
    const hashedPassword = PasswordHelper.hash(password);

    expect(hashedPassword).not.toEqual(password);
  });
});
