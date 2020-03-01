"use strict";
const articleModal = require("./article");
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
  category.associate = function(models) {
    // app.model.Article.belongsTo(app.model.Category, { foreignKey: "category_id", targetKey: "id" });

    app.model.Category.hasMany(app.model.Article, { foreignKey: "category_id", targetKey: "id" });
  };
  return category;
};
