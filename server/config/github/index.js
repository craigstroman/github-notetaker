const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const GitHubStrategy = require('passport-github2').Strategy;

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '.env') });

const github = function (Users, passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: 'read:org,repo',
        state: 'authen',
      },
      function (token, refreshToken, profile, done) {
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

            const emailResult = await getEmail(token);

            if (emailResult) {
              if (emailResult.hasOwnProperty('data')) {
                if (Array.isArray(emailResult.data)) {
                  if (emailResult.data.length) {
                    email = emailResult.data[0].email;
                  }
                }
              }
            } else {
              email = '';
            }

            const [user, created] = await Users.findOrCreate({
              where: { profile_id: profile.id },
              defaults: {
                profile_id: profile.id,
                token: token,
                refreshToken: '',
                email: email,
                name: profile.displayName,
                profile_picture: profileAvatar,
                provider: 'GitHub',
              },
            });

            console.log('created: ', created);

            if (!created && user.dataValues) {
              return done('', user.dataValues);
            } else if (created && user.dataValues) {
              return done('', user.dataValues);
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

module.exports.github = github;
