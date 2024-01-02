/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '@domain/(.+)$': '<rootDir>/src/core/domain/$1',
    '@infra/(.+)$': '<rootDir>/src/core/infra/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
