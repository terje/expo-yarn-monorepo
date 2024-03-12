// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
// https://github.com/expo/expo/issues/19870#issuecomment-1310113475
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
