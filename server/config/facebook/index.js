const FacebookStrategy = require('passport-facebook').Strategy;

export default function(User, passport) {
 passport.use(new FacebookStrategy({

      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name', 'picture.type(large)']
  },
  function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOrCreate({
          id: profile.id,
          name: profile.displayName,
          email: (profile.emails[0].value || '').toLowerCase(),
          provider: 'facebook'
        },
        {
          id: profile.id,
          token,
          name: profile.displayName,
          email: (profile.emails[0].value || '').toLowerCase(),
          picture: profile.photos[0].value,
          provider: 'facebook'
        }, (err, result) => {
          return done(err, result);
        });
      });
  }));
}
