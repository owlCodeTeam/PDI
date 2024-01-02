/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '@core/(.+)$': '<rootDir>/src/core/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};
