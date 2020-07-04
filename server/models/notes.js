export default (sequelize, DataTypes) => {
  const Notes = sequelize.define(
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
  Notes.associate = (models) => {};

  return Notes;
};
