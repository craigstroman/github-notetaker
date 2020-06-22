import google from './google/index';
import facebook from './facebook/index';
import github from './github/index';

const models = require('../models/index');

export default function auth(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  google(models.default.User, passport);

  facebook(models.default.User, passport);

  github(models.default.User, passport);
}
