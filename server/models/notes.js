export default (sequelize, DataTypes) => {
  const user = sequelize.define(
    'notes',
    {
      text: DataTypes.STRING,
      repo: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
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
