import axios from 'axios';
const GitHubStrategy = require('passport-github').Strategy;

require('dotenv').config();

export default function (User, passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        passReqToCallback: true, // req object on auth is passed as first arg
      },
      function (req, token, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            let profileAvatar = null;
            let email = null;

            if (Array.isArray(profile.photos)) {
              if (profile.photos.length) {
                const photos = profile.photos[0].value;

                profileAvatar = photos;
              }
            } else {
              profileAvatar = '';
            }

            const result = await getEmail(token);

            if (result) {
              if (result.hasOwnProperty('data')) {
                if (Array.isArray(result.data)) {
                  if (result.data.length) {
                    email = result.data[0].email;
                  }
                }
              }
            } else {
              email = '';
            }

            const user = await User.findOrCreate({
              where: { user_id: profile.id },
              defaults: {
                user_id: profile.id,
                token,
                name: profile.displayName,
                email,
                picture: profileAvatar,
                provider: 'github',
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

const getEmail = (token) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token: ${token}`,
    },
  };

  try {
    const result = axios.get('https://api.github.com/user/emails', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `token ${token}`,
      },
    });

    return result;
  } catch (err) {
    console.log('Error: ');
    console.log(err);

    return 0;
  }
};
