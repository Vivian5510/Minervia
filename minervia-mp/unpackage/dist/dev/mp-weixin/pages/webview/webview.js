"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "webview",
  setup(__props) {
    let url = common_vendor.index.getStorageSync("wvUrl");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(url)
      };
    };
  }
};
wx.createPage(_sfc_main);
