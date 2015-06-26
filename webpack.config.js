var assign = require('object-assign');
var common = require('./webpack.common.js');

module.exports = assign({}, common, {
  output: assign({}, common.output, {
    sourceMapFile: 'bundle.map'
  }),
  devtool: 'source-map'
});
