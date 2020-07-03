import google from './google/index';
import facebook from './facebook/index';
import github from './github/index';
import models from '../models/index';

export default function auth(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  google(models.User, passport);

  facebook(models.User, passport);

  github(models.User, passport);
}
