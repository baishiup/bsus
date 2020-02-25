## sequelize

> [more doc](https://github.com/sequelize/cli#documentation)

```js
// 新建.sequelizerc目录配置
const path = require("path");

module.exports = {
  config: path.join(__dirname, "database/config.json"),
  "migrations-path": path.join(__dirname, "database/migrations"),
  "seeders-path": path.join(__dirname, "database/seeders"),
  "models-path": path.join(__dirname, "app/model")
};
```

```bash
# 生成配置config连接配置
sequelize init:config

# 根据.sequelizerc目录配置 生成migrations,seeders,model目录(或者自己创建)
sequelize init:migrations
sequelize init:seeders
sequelize init:models

# 创建数据库 bsus
sequelize db:create bsus

# （推荐用model生成命令，会同时生成model和migrate）创建迁移文件 databse/migrations/${tempdata}-user.js up升级包含需要创建得表结构，down降级包含需要删除的表
sequelize migration:create  --name=user
# 编辑 添加升级,降级的方法
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable("user", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  }
};
# 执行migration升级up,将表结构插入数据库
sequlize db:migrate
# 执行migrate降级down,删除表
sequlize db:migrate:undo

# (推荐用这个，会同时生成model和migrate)创建数据模型
sequelize model:create --name user --attributes name:string,age:number
# 执行后会同时生成初始的model和migrate，目前没找到根据model同步更新migrate的方法，先暂停研究


```
