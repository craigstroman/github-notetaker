const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config();

export default function (User, passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: false,
      },
      function (token, profile, done) {
        process.nextTick(async function () {
          try {
            const user = await User.findOneAndUpdate(
              { profile_id: profile.id },
              {
                $setOnInsert: {
                  profile_id: profile.id,
                  token,
                  email: (profile.emails[0].value || '').toLowerCase(),
                  name: profile.displayName,
                  profile_picture: profile.photos[0].value,
                  provider: 'google',
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
