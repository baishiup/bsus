const Controller = require("egg").Controller;
const qiniu = require("qiniu");
const { HttpSuccess } = require("../decorators");

class QiniuController extends Controller {
  getToken() {
    let mac = new qiniu.auth.digest.Mac(this.config.qiniu.ak, this.config.qiniu.sk);
    let option = {
      scope: this.config.qiniu.bucket
    };
    let putPolicy = new qiniu.rs.PutPolicy(option);
    let uploadToken = putPolicy.uploadToken(mac);
    HttpSuccess.call(this, {
      data: uploadToken
    });
  }
}

module.exports = QiniuController;
