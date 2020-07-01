export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      profile_id: DataTypes.STRING,
      token: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      underscored: true,
    },
  );
  user.associate = (models) => {
    models.User.belongsToMany(models.Notes, { through: models.User, foreignKey: 'user_id' });
  };
  return user;
};
