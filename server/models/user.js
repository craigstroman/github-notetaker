export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      user_id: DataTypes.STRING,
      token: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      picture: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      underscored: true,
    },
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
