import { google } from './google/google';
import { facebook } from './facebook/facebook';
import { github } from './github/github';

export const auth = (passport) => {
  passport.serializeUser(function (Users, done) {
    done(null, Users);
  });

  passport.deserializeUser(function (Users, done) {
    done(null, Users);
  });

  google(Users, passport);

  facebook(Users, passport);

  github(Users, passport);
};
