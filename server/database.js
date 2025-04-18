const path = require('path');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: function (str) {
    console.log(str);
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

const models = {
  User: require(__dirname, './models/User.js'),
  Notes: require(__dirname, './models/Notes.js'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = {
  models,
  sequelize,
};
