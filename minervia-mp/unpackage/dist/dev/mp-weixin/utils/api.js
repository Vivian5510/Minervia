"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:8080/mp";
const request = (options) => {
  return new Promise((resolve, rejects) => {
    let login_expire_time = common_vendor.index.getStorageSync("login_expire_time");
    if (!login_expire_time || login_expire_time < (/* @__PURE__ */ new Date()).getTime()) {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          common_vendor.index.request({
            url: BASE_URL + "/login",
            data: {
              js_code: loginRes.code
            },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: (res) => {
              common_vendor.index.setStorageSync("mp-token", res.data.data);
              common_vendor.index.setStorageSync(
                "login_expire_time",
                (/* @__PURE__ */ new Date()).getTime() + 3600 * 1e3
                // 设置过期时间为1小时
              );
              handleRequest(options, resolve, rejects);
            }
          });
        }
      });
    } else {
      handleRequest(options, resolve, rejects);
    }
  });
};
const handleRequest = (options, resolve, rejects) => {
  common_vendor.index.request({
    url: BASE_URL + options.url,
    data: options.data,
    method: options.method,
    header: {
      "content-type": "application/json",
      "mp-token": common_vendor.index.getStorageSync("mp-token")
    },
    success: (res) => {
      return resolve(res.data);
    },
    fail: (err) => {
      return rejects(err);
    },
    complete: () => {
      common_vendor.index.hideLoading();
    }
  });
};
const getAllBanners = () => {
  return request({
    url: "/banners",
    method: "GET"
  });
};
const getAllCategories = () => {
  return request({
    url: "/categories",
    method: "GET"
  });
};
exports.getAllBanners = getAllBanners;
exports.getAllCategories = getAllCategories;
