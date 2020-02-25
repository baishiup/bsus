const { PublishState } = require("../constant");
const categoryModel = require("./category");

module.exports = app => {
  const { STRING, UUID, UUIDV4, ENUM, TEXT } = app.Sequelize;
  const article = app.model.define(
    "article",
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
      },
      // 标题
      title: {
        type: STRING,
        allowNull: false
      },
      // 描述
      description: {
        type: STRING,
        defaultValue: ""
      },
      // 缩略图
      thumb: {
        type: STRING,
        defaultValue: ""
      },
      // markdown code
      code: {
        type: TEXT,
        defaultValue: ""
      },
      // 内容
      content: {
        type: TEXT,
        defaultValue: ""
      },
      // 关键字SEO  'a,b,c'
      keywords: {
        type: STRING,
        defaultValue: ""
      },
      // 发布状态
      state: {
        type: ENUM,
        values: Object.values(PublishState),
        defaultValue: PublishState.published
      },
      // 分类
      category_id: {
        type: UUID,
        references: {
          model: categoryModel,
          key: "id"
        }
      },
      // 标签
      tags: {
        type: STRING,
        defaultValue: ""
      }
    },
    {}
  );
  article.associate = function(models) {
    app.model.Article.belongsTo(app.model.Category, { foreignKey: "category_id", targetKey: "id" });
  };
  return article;
};
