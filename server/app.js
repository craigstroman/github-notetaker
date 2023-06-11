import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import { addPath } from 'app-module-path';
import routes from './routes/routes';
import auth from './config/auth';

const app = express();
const nodeEnv = process.env.NODE_ENV;

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

auth(passport); // pass passport for configuration

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.dev.js');
  const webpackCompiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
      // noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(
    require('webpack-hot-middleware')(webpackCompiler, {
      log: false,
      path: '/__webpack_hmr',
    }),
  );
}

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.locals.javascript = javascript;

app.locals.title = 'GitHub Note Taker';
app.locals.description = 'A simple React app that allows you to browse GitHub and take notes.';

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
addPath(__dirname);

app.use(session({ secret: 'anything1213321123' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

export default app;
