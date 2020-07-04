export default (sequelize, DataTypes) => {
  const User = sequelize.define(
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
  User.associate = (models) => {};

  return User;
};
