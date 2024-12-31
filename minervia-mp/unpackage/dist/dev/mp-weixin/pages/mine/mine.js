"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  //监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
  onInit() {
  },
  //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
  onLoad() {
  },
  //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {
  },
  //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  beforeDestroy() {
  },
  //页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
  onReachBottom() {
  },
  onShareAppMessage(res) {
  },
  created() {
  },
  methods: {}
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  _component_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.p({
      name: "arrow-right"
    }),
    c: common_assets._imports_1,
    d: common_vendor.p({
      name: "arrow-right"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
