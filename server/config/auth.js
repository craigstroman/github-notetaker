import google from './google/index';
import facebook from './facebook/index';
import github from './github/index';
import { User } from '../models/user';

User.init();

export default function auth(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  google(User, passport);

  facebook(User, passport);

  github(User, passport);
}
