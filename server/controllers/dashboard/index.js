import axios from 'axios';
import Sequelize, { QueryTypes } from 'sequelize';
import models from '../../models/index';

// select distinct users.email, users.name, users.provider, notes.repo from users inner join notes on users.id = notes.user_id where users.user_id = '10101716449363795';

export async function dashboard(req, res) {
  const user = req.user;
  let notes = {};
  let error = {};

  if (user) {
    try {
      notes = await models.sequelize.query(
        'select distinct on (repo) id, repo from notes where user_id = (:id)',
        {
          replacements: { id: user.id },
          type: QueryTypes.SELECT,
        },
      );

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
