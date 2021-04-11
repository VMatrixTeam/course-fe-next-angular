const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = (config) => {
  config.plugins.push(new ProgressBarPlugin());
  return config;
};
