const crypto = require("crypto");

module.exports = {
  str2Md5: str =>
    crypto
      .createHash("md5")
      .update(str, "utf-8")
      .digest("hex")
};
