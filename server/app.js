import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import config from 'config';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import { addPath } from 'app-module-path';
import routes from './routes/routes';
import auth from './config/auth';


const app = express();
const db = require('./models/notes');
const nodeEnv = process.env.NODE_ENV;
const filePath = (nodeEnv === 'development') ? '../client' : '../public';

const javascript = (nodeEnv === 'development') ?  '/static/js/bundle.js' : '/static/js/main.min.js';

const uriString = process.env.GITHUB_MONGODB_URI || 'mongodb://localhost/gitHubNoteTaker';

mongoose.Promise = global.Promise;
mongoose.connect(uriString, { useMongoClient: true });

auth(passport); // pass passport for configuration

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
app.use('/static', express.static('public'))
addPath(__dirname);

app.use(session({ secret: 'anything1213321123' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

export default app;
