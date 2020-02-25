"use strict";

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;
  const auth = app.model.define(
    "auth",
    {
      username: {
        type: STRING,
        unique: true
      },
      password: {
        type: STRING,
        unique: true
      }
    },
    {}
  );
  auth.associate = function(models) {};
  return auth;
};
