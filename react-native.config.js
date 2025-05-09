/**
 * https://github.com/react-native-community/cli/blob/master/docs/configuration.md
 */
module.exports = {
  dependencies: {
    'react-native-flipper': process.env.NO_FLIPPER
      ? {platforms: {ios: null}}
      : {},
  },
};
