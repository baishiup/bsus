module.exports = {
  // 文章发布状态
  PublishState: {
    draft: "0", // 草稿
    published: "1", // 已发布
    deleted: "2" // 已删除
  },
  // http status
  httpStatus: {
    SUCCESS: 200, // 请求成功
    CREATED: 201, // 创建成功
    BAD_REQUEST: 400, // 请求业务拒绝，格式或参数错误
    UNAUTHORIZED: 401, // 鉴权失败
    FORBIDDEN: 403, // 权限不足
    NOT_FOUND: 404, // 资源不存在
    INTERNAL_SERVER_ERROR: 500 // 服务器错误
  },
  // api status
  apiStatus: {
    SUCCESS: "success",
    ERROR: "error"
  }
};
