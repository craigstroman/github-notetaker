const { google } = require('./google/index.js');
const { facebook } = require('./facebook/index.js');
const { github } = require('./github/index.js');
const Users = require('../models/user.js');

function auth(passport) {
  passport.serializeUser(function (Users, done) {
    done(null, Users);
  });

  passport.deserializeUser(function (Users, done) {
    done(null, Users);
  });

  // TODO: work on making auth work for Facebook, then Google. Since GitHub auth works, without saving refreshToken.
  // TODO: Work on making settings page work

  google(Users, passport);

  facebook(Users, passport);

  github(Users, passport);
}

module.exports.auth = auth;
