import axios from 'axios';
import Sequelize from 'sequelize';

const models = require('../../models/index');
const User = models.default.User;
const Notes = models.default.Notes;

// TODO: Re-associate Notes to User model so I can do a simple inner join with sequelize using include to select
// both user info and the repos that have notes to show the repos.
// TODO: Look at repo and master branch to get markup for view.

// select distinct users.email, users.name, users.provider, notes.repo from users inner join notes on users.id = notes.user_id where users.user_id = '10101716449363795';

export async function dashboard(req, res) {
  const user = req.user;

  if (user) {
    try {
      const userInfo = await User.findAll({
        where: {
          profile_id: user.profile_id,
        },
        include: {
          model: Notes,
        },
      });

      console.log('userInfo: ', userInfo[0].notes);

      res.render('dashboard', {
        title: `${req.app.locals.title} - Dashboard`,
        content: req.app.locals.description,
        user: req.user,
        userInfo,
      });
    } catch (err) {
      console.log('Error: ', err);
      res.render('dashboard', {
        title: `${req.app.locals.title} - Dashboard`,
        content: req.app.locals.description,
        user: req.user,
        err,
      });
    }

    // User.find({
    //   user,
    // }).exec((err, notes) => {
    //   if (err) {
    //     res.render('dashboard', {
    //       title: `${req.app.locals.title} - Dashboard`,
    //       content: req.app.locals.description,
    //       user: req.user,
    //       err,
    //     });
    //   } else {
    //     let repos = [...new Set(notes.map((item) => item.repo))];
    //     res.render('dashboard', {
    //       title: `${req.app.locals.title} - Dashboard`,
    //       content: req.app.locals.description,
    //       user: req.user,
    //       repos,
    //     });
    //   }
    // });
  }
}

export function settings(req, res) {
  res.render('settings', {
    title: `${req.app.locals.title} - Settings`,
    content: req.app.locals.description,
    user: req.user,
  });
}
