/* eslint valid-jsdoc: "off" */

"use strict";

const { httpStatus } = require("../app/constant");

module.exports = appInfo => {
  const config = (exports = {
    sequelize: {
      dialect: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "Admin.123",
      database: "bsus"
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1582287937831_4476";
  config.security = {
    // 关闭csrf验证
    csrf: {
      enable: false
    },
    // 白名单
    domainWhiteList: ["*"]
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  config.middleware = ["jwtHandler", "errorHandler"];
  config.jwtHandler = {
    secret: "bsusadmin"
  };
  // add your user config here
  const userConfig = {
    myAppName: "Baishiup site",
    qiniu: {
      ak: "9G9jn3S47ZS1nMdYDvdqZSqbhEVIXI7F7Hv44eoz",
      sk: "nbCAx_Hg5GRSzs11jBGodU4Ihj9gD6VFSNyluwc3",
      bucket: "baishiup"
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
