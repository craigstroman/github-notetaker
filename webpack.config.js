const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  const nodeEnv = process.env.NODE_ENV;
  const isProd = (nodeEnv === 'production') ? true : false;
  const filePath = (isProd) ? path.join(__dirname, './dist/js/') : path.join(__dirname, './src/js/');
  const fileName = (isProd) ? 'main.min.js'  : 'bundle.js';

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    })
  ];

  if (isProd) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  return {
    entry: {
       app: path.join(__dirname, 'src/js/app.js')
    },

    output: {
      path: filePath,
      filename: fileName,
    },

    module: {
      loaders: [
         {
           enforce: 'pre',
           test: /\.(js|jsx)$/,
           exclude: [/node_modules/, path.resolve(__dirname, 'src/js/bundle.js')],
           loader: 'eslint-loader',
          options: {
            emitError: true,
            emitWarning: true,
            failOnError: false
          }
         },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

    plugins: plugins,

    devServer: {
      contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'src/js'), path.join(__dirname, 'src/css')],
      hot: false,
      watchContentBase: true,
      port: 9000,
      historyApiFallback: true
    }
  }
};
