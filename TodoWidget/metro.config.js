/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');
  
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = wrapWithReanimatedMetroConfig(module.exports, config);
