"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  TnPopup();
}
const TnPopup = () => "../../uni_modules/tuniaoui-vue3/components/popup/src/popup.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    let showPopup = common_vendor.ref(false);
    function itemClick(item) {
      if (item == "records") {
        common_vendor.index.navigateTo({
          url: "/pages/records/records"
        });
      } else {
        showPopup.value = true;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => itemClick("records")),
        c: common_assets._imports_1,
        d: common_vendor.o(($event) => itemClick("about")),
        e: common_vendor.o(($event) => common_vendor.isRef(showPopup) ? showPopup.value = $event : showPopup = $event),
        f: common_vendor.p({
          ["open-direction"]: "bottom",
          height: "400rpx",
          radius: "15px",
          modelValue: common_vendor.unref(showPopup)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
