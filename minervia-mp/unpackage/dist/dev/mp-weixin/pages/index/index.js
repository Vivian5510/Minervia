"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "banners",
        success: (res) => {
          console.log("banner已加载到本地");
        },
        fail: (err) => {
          console.log("banner未加载到本地");
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllBanners().then((res) => {
            console.log("加载网络banner资源到本地");
            common_vendor.index.setStorage({
              key: "banners",
              data: res
            });
          }).catch();
        }
      });
      common_vendor.index.getStorage({
        key: "categories",
        success: (res) => {
          console.log("categories已加载到本地");
        },
        fail: (err) => {
          console.log("categories未加载到本地");
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllCategories().then((res) => {
            console.log("加载网络categories资源到本地");
            common_vendor.index.setStorage({
              key: "categories",
              data: res
            });
          }).catch();
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
