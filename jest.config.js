module.exports = {
  testEnvironment: 'jsdom',
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
