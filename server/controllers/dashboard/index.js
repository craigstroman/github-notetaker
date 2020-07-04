import axios from 'axios';
import Sequelize, { QueryTypes } from 'sequelize';
import models from '../../models/index';

export async function dashboard(req, res) {
  const User = models.User;
  let user = req.user;
  let notes = {};
  let error = {};

  if (user) {
    try {
      notes = await models.sequelize.query('select distinct on (repo) * from notes where user_id = (:id)', {
        replacements: { id: user.id },
        type: QueryTypes.SELECT,
      });

      const result = await models.sequelize.query('select * from users where id = (:id)', {
        replacements: { id: user.id },
        type: QueryTypes.SELECT,
      });

      if (result) {
        if (Array.isArray(result)) {
          if (result.length) {
            user = result[0];
          }
        }
      }

      error = null;
    } catch (err) {
      console.log('Error: ', err);

      notes = null;
      error = err;
    }

    res.render('dashboard', {
      title: `${req.app.locals.title} - Dashboard`,
      content: req.app.locals.description,
      user,
      notes,
      error,
    });
  }
}

export function settings(req, res) {
  res.render('settings', {
    title: `${req.app.locals.title} - Settings`,
    content: req.app.locals.description,
    user: req.user,
  });
}

export async function updateUserInfo(req, res) {
  const User = models.User;
  const user = req.user;

  if (user) {
    const name = req.body.name;

    try {
      const result = await User.update(
        {
          name,
        },
        {
          where: { id: user.id },
        },
      );

      dashboard(req, res);
    } catch (err) {
      console.log('error: ', err);
      dashboard(req, res);
    }
  } else {
    dashboard(req, res);
  }
}
