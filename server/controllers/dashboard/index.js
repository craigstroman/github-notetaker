import mongoose from 'mongoose';
import { User } from '../../schemas/user';
import { Notes } from '../../schemas/notes';

export async function dashboard(req, res) {
  let user = {};
  let notes = [];
  let error = {};
  try {
    const userInfo = req.user;
    const userId = new mongoose.Types.ObjectId(userInfo._id);

    user = await User.findById({
      _id: userId,
    });

    const notesResult = await Notes.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: '$repo', data: { $first: '$$ROOT' } } },
    ]);

    notesResult.forEach((el) => {
      if (el.data) {
        notes.push(el.data);
      }
    });
  } catch (error) {
    console.log('error: ');
    console.log(error);

    error = error;
  }

  res.render('dashboard', {
    title: `${req.app.locals.title} - Dashboard`,
    content: req.app.locals.description,
    user,
    notes,
    error,
  });
}

export function settings(req, res) {
  res.render('settings', {
    title: `${req.app.locals.title} - Settings`,
    content: req.app.locals.description,
    user: req.user,
  });
}

export async function updateUserInfo(req, res) {
  const userInfo = req.user;
  const userId = new mongoose.Types.ObjectId(userInfo._id);

  if (user) {
    const name = req.body.name;

    try {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $setOnInsert: {
            name,
          },
        },
        { upsert: true, new: true, rawResult: true, returnNewDocument: true },
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
