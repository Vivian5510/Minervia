"use strict";
const uni_modules_tuniaouiVue3_utils_vue_install = require("../../utils/vue/install.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_constants_zIndex = require("../../constants/z-index.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_libs_lodash_isBoolean = require("../../libs/lodash/is-boolean.js");
const uni_modules_tuniaouiVue3_components_overlay_src_composables_useOverlay = require("./src/composables/use-overlay.js");
const overlayProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 是否显示遮罩层
   */
  show: {
    type: Boolean,
    default: false
  },
  /**
   * @description 动画时间，单位毫秒
   */
  duration: {
    type: Number,
    default: 300
  },
  /**
   * @description 遮罩层透明度，有效值0-1
   */
  opacity: {
    type: Number,
    default: 0.5
  },
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: uni_modules_tuniaouiVue3_constants_zIndex.ZIndex.mask
  }
});
const overlayEmits = {
  "update:show": (value) => uni_modules_tuniaouiVue3_libs_lodash_isBoolean.isBoolean(value),
  click: () => true
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "overlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { overlayClass, overlayStyle, overlayClick } = uni_modules_tuniaouiVue3_components_overlay_src_composables_useOverlay.useOverlay(props, emits);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(overlayClass)),
        b: common_vendor.s(common_vendor.unref(overlayStyle)),
        c: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(overlayClick) && common_vendor.unref(overlayClick)(...args)
        ),
        d: common_vendor.o(() => {
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2319383f"]]);
uni_modules_tuniaouiVue3_utils_vue_install.withNoopInstall(Component);
exports.Component = Component;
exports.overlayProps = overlayProps;
