const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'client/.eslintrc.js'),
  context: path.resolve(__dirname, '/client'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['/node_modules/'],
  emitError: true,
  emitWarning: true,
};

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [path.join(__dirname, 'client/containers/App.tsx')],
  },

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './client/.eslintrc.js',
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      // {
      //   test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
      //   loader: 'file-loader?name=node_modules/@fortawesome/fontawesome-free/webfonts[name].[ext]',
      // },
    ],
  },
  plugins: [new ESLintPlugin(ESLintOptions)],
};
