"use strict";

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;
  const tag = app.model.define(
    "tag",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
      },
      name: {
        type: STRING,
        unique: true
      }
    },
    {}
  );
  tag.associate = function(models) {};
  return tag;
};
