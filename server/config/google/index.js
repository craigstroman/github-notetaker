const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export default function(User, passport) {
 passport.use(new GoogleStrategy({

      clientID        : process.env.GOOGLE_CLIENT_ID,
      clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
      callbackURL     : process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback : true
  },
  function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOrCreate({
          id: profile.id,
          name: profile.displayName,
          email: (profile.emails[0].value || '').toLowerCase(),
          provider: 'google'
        },
        {
          id: profile.id,
          token,
          name: profile.displayName,
          email: (profile.emails[0].value || '').toLowerCase(),
          picture: profile.photos[0].value,
          provider: 'google'
        }, (err, result) => {
          return done(err, result);
        });
      });
  }));
}
