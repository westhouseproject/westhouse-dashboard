var assign = require('object-assign');
var common = require('./webpack.common.js');
var webpack = require('webpack');

common = assign(
  {},
  common,
  {
    devtool: 'none',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: {
          comments: false
        }
      })
    ]
  }
);

common
  .module
  .loaders[0]
  .query
  .plugins
  .concat([
    'closure-elimination',
    'remove-debugger',
    'dead-code-elimination',
    'react-constant-elements'
  ]);

module.exports = common;
