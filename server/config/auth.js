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

  google(Users, passport);

  facebook(Users, passport);

  github(Users, passport);
}

module.exports.auth = auth;
