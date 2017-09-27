import env from 'node-env-file';
import User from '../models/user';
import google from './google/index';
import facebook from './facebook/index';

if ( process.env.NODE_ENV === 'development' ) {
  env(__dirname + '/../../.env');
}

export default function auth(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  google(User, passport);

  facebook(User, passport);
}
