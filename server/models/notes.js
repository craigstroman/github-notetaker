export default (sequelize, DataTypes) => {
  const notes = sequelize.define(
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
  notes.associate = (models) => {
    models.Notes.belongsTo(models.User, { through: models.Notes, foreignKey: 'user_id' });
  };
  return notes;
};
