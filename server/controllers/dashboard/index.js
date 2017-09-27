import axios from 'axios';
import Notes from '../../models/notes';

export function dashboard(req, res) {
  const user = req.user;

  if (user) {
    Notes.find({
      user,
    }).exec((err, notes) => {
      if (err) {
        res.render('dashboard', {
          title: `${req.app.locals.title} - Dashboard`,
          content: req.app.locals.description,
          user: req.user,
          err
        });
      } else {
        let repos = [...new Set(notes.map(item => item.repo))];

        res.render('dashboard', {
          title: `${req.app.locals.title} - Dashboard`,
          content: req.app.locals.description,
          user: req.user,
          repos
        });
      }
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


