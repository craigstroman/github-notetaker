const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config();

export default function (User, passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      function (req, token, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            const user = await User.findOrCreate({
              where: { user_id: profile.id },
              defaults: {
                user_id: profile.id,
                token,
                email: (profile.emails[0].value || '').toLowerCase(),
                name: profile.displayName,
                picture: profile.photos[0].value,
                provider: 'google',
              },
            }).spread(function (user, created) {
              const result = user.get({
                plain: true,
              });

              return result;
            });

            const err = null;

            return done(err, user);
          } catch (err) {
            console.log('error: ', err);

            const user = null;

            return done(err, user);
          }
        });
      },
    ),
  );
}
