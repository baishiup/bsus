"use strict";

module.exports = app => {
  const { STRING, UUID, UUIDV4, DATE, NOW } = app.Sequelize;
  const category = app.model.define(
    "category",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
      },
      name: STRING,
      thumb: STRING
    },
    {}
  );
  category.associate = function(models) {};
  return category;
};
