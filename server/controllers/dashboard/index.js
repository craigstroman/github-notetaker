const { QueryTypes } = require('sequelize');
const models = require('../../database.js');
const Users = require('../../models/user.js');

async function dashboard(req, res) {
  let user = {};
  let notes = [];
  let error = {};
  try {
    const userInfo = req.user;
    const userId = userInfo.id;

    user = await Users.findOne({ where: { id: userId } });

    notes = await models.sequelize.query('select * from notes where user_id = ? and text is not null', {
      replacements: [userId],
      type: QueryTypes.SELECT,
      raw: true,
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

function settings(req, res) {
  res.render('settings', {
    title: `${req.app.locals.title} - Settings`,
    content: req.app.locals.description,
    user: req.user,
  });
}

async function updateUserInfo(req, res) {
  const userInfo = req.user;
  const userId = new mongoose.Types.ObjectId(userInfo._id);

  if (user) {
    const name = req.body.name;

    try {
      await User.update(
        {
          name,
        },
        {
          where: {
            _id: userId,
          },
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

module.exports = {
  dashboard,
  settings,
  updateUserInfo,
};
