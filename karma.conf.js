'use strict';

var webpackConfigs = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],

    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfigs.module
    },
    webpackServer: {
      noInfo: true
    }
  });
};
