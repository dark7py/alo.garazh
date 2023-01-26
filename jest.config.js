module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).js'],
  transformIgnorePatterns: ['/node_modules/'],
  verbose: false,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
