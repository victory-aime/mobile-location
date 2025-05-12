module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          _assets: './src/assets',
          _app: './src/app/',
          _components: './src/components',
          _locales: './src/locales',
          _hooks: './src/hooks',
          _navigations: './src/navigations',
          _services: './src/services',
          _constants: './src/constants',
          _modules: './src/modules',
          _theme: './src/theme',
          _utils: './src/utils',
          _types: './src/types',
        },
      },
    ],

    'react-native-reanimated/plugin',
  ],
};
