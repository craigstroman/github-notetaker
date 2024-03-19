const path = require('path');
const { addPath } = require('app-module-path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');

const { routes } = require('./routes/routes.js');
const { auth } = require('./config/auth.js');

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const nodeEnv = process.env.NODE_ENV;

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

auth(passport); // pass passport for configuration

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webPackConfig = require('../webpack.config.dev.ts');
  const webpackCompiler = webpack(webPackConfig);

  app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
      // noInfo: true,
      publicPath: webPackConfig.output.publicPath,
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
app.set('views', path.join(__dirname, 'server/views'));
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

app.use((err, req, res, next) => {
  log.error(err);
  log.error(err.stack);
  return res.status(err.statusCode || 500).send(err.message);
});

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports.app = app;
