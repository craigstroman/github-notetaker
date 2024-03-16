const path = require('path');
const dotenv = require('dotenv');
const FacebookStrategy = require('passport-facebook').Strategy;

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '.env') });

const facebook = function (User, passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: false,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
      },
      function (token, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            const name = `${profile.name.givenName} ${profile.name.familyName}`;

            const user = await User.update(
              {
                profile_id: profile.id,
                token,
                refreshToken,
                name,
                email: (profile.emails[0].value || '').toLowerCase(),
                profile_picture: profile.photos[0].value,
                provider: 'Facebook',
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

module.exports.facebook = facebook;
