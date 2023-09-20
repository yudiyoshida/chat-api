/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@config/(.*)': ['<rootDir>/src/config/$1'],
    '@database/(.*)': ['<rootDir>/src/database/$1'],
    '@errors/(.*)': ['<rootDir>/src/errors/$1'],
    '@libs/(.*)': ['<rootDir>/src/libs/$1'],
    '@helpers/(.*)': ['<rootDir>/src/shared/helpers/$1'],
    '@middlewares/(.*)': ['<rootDir>/src/shared/middlewares/$1'],
    '@abstracts/(.*)': ['<rootDir>/src/utils/abstracts/$1'],
    '@decorators/(.*)': ['<rootDir>/src/utils/decorators/$1'],
    '@dtos/(.*)': ['<rootDir>/src/utils/dtos/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/utils/interfaces/$1'],
    '@customTypes/(.*)': ['<rootDir>/src/utils/types/$1'],
  },
};
