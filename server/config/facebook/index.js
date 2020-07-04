const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

export default function (User, passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
      },
      function (req, token, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            const name = `${profile.name.givenName} ${profile.name.familyName}`;

            const user = await User.findOrCreate({
              where: { profile_id: profile.id },
              defaults: {
                profile_id: profile.id,
                token,
                name,
                email: (profile.emails[0].value || '').toLowerCase(),
                profile_picture: profile.photos[0].value,
                provider: 'facebook',
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
