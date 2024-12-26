"use strict";
const common_vendor = require("../common/vendor.js");
const login = () => {
  common_vendor.index.login({
    provider: "weixin",
    success: (loginRes) => {
      console.log("openid		>>>>" + loginRes.code);
      common_vendor.index.request({
        url: "http://localhost:8080/mp/login",
        data: {
          js_code: loginRes.code
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: (res) => {
          console.log("mp-token >>>>" + res.data.data);
          common_vendor.index.setStorage({
            key: "mp-token",
            data: res.data.data,
            success: () => {
              console.log("success");
            }
          });
        }
      });
    }
  });
};
exports.login = login;
