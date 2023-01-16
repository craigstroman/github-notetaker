const path = require('path');
// const webpack = require('webpack');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const PATHS = {
  src: path.join(__dirname, './client'),
  dist: path.join(__dirname, './public'),
};

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [
      path.join(__dirname, 'client/containers/App.tsx'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
    hotUpdateChunkFilename: '.hot/hot-update.js',
    hotUpdateMainFilename: '.hot/hot-update.json',
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [['@babel/plugin-proposal-object-rest-spread']],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: './client/.eslintrc.js',
        },
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
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   debug: true,
    //   sourceMap: true,
    //   devTool: 'source-map',
    // }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[file].map',
    // }),
  ],
};
