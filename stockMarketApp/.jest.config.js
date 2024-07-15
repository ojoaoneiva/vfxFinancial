//jest.configjs
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.(js|jsx)$': require.resolve('react-native/jest/preprocessor.js'),
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
