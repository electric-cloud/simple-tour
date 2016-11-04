const webpack = require('webpack'),
  path = require('path');


module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8090',
      './src/index.js'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join('./dist'),
    filename: 'simple-tour.js',
    libraryTarget: 'umd',
    library: 'simpleTour',
    umdNamedDefine: true,
    publicPath: 'http://localhost:8090/dist/'
  },
  devServer: {
    port: 8090
  },
  devtool: 'source-map'
};
