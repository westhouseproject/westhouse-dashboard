var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    root: [ path.join(__dirname, 'bower_components') ]
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          stage: 0,
          optional: ['runtime'],
          plugins: [
            'react-require'
          ]
        },
      },
      { test: /\.css$/, loader: 'style!css!autoprefixer' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        'bower.json',
        ['main']
      )
    )
  ]
};
