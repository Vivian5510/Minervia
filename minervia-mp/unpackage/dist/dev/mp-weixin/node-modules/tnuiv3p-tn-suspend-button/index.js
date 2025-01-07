"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  TnIcon();
}
const TnIcon = () => "../@tuniao/tnui-vue3-uniapp/components/icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: common_vendor.suspendButtonProps,
  emits: common_vendor.suspendButtonEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { buttonClass, buttonStyle, iconClass, iconStyle } = common_vendor.useSuspendButtonCustomStyle(props);
    const { clickHandle } = common_vendor.useSuspendButton(emits);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: _ctx.$props.icon
        }),
        b: common_vendor.n(common_vendor.unref(iconClass)),
        c: common_vendor.s(common_vendor.unref(iconStyle)),
        d: common_vendor.n(common_vendor.unref(buttonClass)),
        e: common_vendor.s(common_vendor.unref(buttonStyle)),
        f: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(clickHandle) && common_vendor.unref(clickHandle)(...args)
        )
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b5941aa"]]);
wx.createComponent(Component);
