module.exports = {
  bail: true,
  verbose: true,
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '.*\.(tsx?)$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\.(css|jpg|png)$': '<rootDir>/smoke/empty-module.js',
    '^components(.*)$': '<rootDir>/src/components/$1',
    '^containers(.*)$': '<rootDir>/src/containers/$1',
    '^constants(.*)$': '<rootDir>/src/constants/$1',
    '^utils(.*)$': '<rootDir>/src/utils/$1',
    '^stores(.*)$': '<rootDir>/src/stores/$1'
  },
  'collectCoverageFrom': [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!src/index.tsx',
  ]
}
