const path = require('path');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '.env') });

const google = function (Users, passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: false,
      },
      function (token, refreshToken, profile, done) {
        console.log('Users: ', Users);
        process.nextTick(async function () {
          try {
            const user = await Users.update(
              {
                profile_id: profile.id,
                token,
                refreshToken,
                email: (profile.emails[0].value || '').toLowerCase(),
                name: profile.displayName,
                profile_picture: profile.photos[0].value,
                provider: 'Google',
              },
              {
                where: { profile_id: profile.id },
              },
            );

            const err = null;

            if (user && user.value) {
              return done(err, user.value);
            }
          } catch (err) {
            console.log('error: ', err);

            const user = null;

            return done(err, user);
          }
        });
      },
    ),
  );
};

module.exports.google = google;
