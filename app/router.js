"use strict";

module.exports = app => {
  const { router, controller } = app;

  router.get("/tag", controller.tag.getList);
  router.post("/tag", controller.tag.create);
  router.delete("/tag/:id", controller.tag.delete);

  router.get("/category", controller.category.getList);
  router.get("/category/:id", controller.category.get);
  router.post("/category", controller.category.create);
  router.delete("/category/:id", controller.category.delete);
  router.put("/category/:id", controller.category.update);

  router.get("/article", controller.article.getList);
  router.get("/article/:id", controller.article.get);
  router.post("/article", controller.article.create);
  router.delete("/article/:id", controller.article.delete);
  router.put("/article/:id", controller.article.update);

  router.get("/login", controller.auth.dologin);
  router.get("/register", controller.auth.register);
};
