const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const debug = (NODE_ENV === 'production') ? false : true;
const filePath = (NODE_ENV === 'production') ? path.join(__dirname, './dist/js/') : path.join(__dirname, './src/js/');
const fileName = (NODE_ENV === 'production') ? 'main.min.js'  : 'bundle.js';

const config = {
  debug: debug,
  entry: './src/js/app.js',
  target: 'web',
  output: {
    path: filePath,
    filename: fileName
  },
  devtool: 'source-map',
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV || 'development')
      }
    })
  ]
};

if (NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
