const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

export default function (User, passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: false,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
      },
      function (token, profile, done) {
        process.nextTick(async function () {
          try {
            const name = `${profile.name.givenName} ${profile.name.familyName}`;

            const user = await User.findOneAndUpdate(
              { profile_id: profile.id },
              {
                $setOnInsert: {
                  profile_id: profile.id,
                  token,
                  refreshToken,
                  name,
                  email: (profile.emails[0].value || '').toLowerCase(),
                  profile_picture: profile.photos[0].value,
                  provider: 'facebook',
                },
              },
              { upsert: true, new: true, rawResult: true, returnNewDocument: true },
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
}
