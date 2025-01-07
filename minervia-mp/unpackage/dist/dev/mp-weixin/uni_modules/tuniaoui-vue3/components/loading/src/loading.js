"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_constants_types = require("../../../constants/types.js");
const uni_modules_tuniaouiVue3_components_loading_src_composables_loadingCustom = require("./composables/loading-custom.js");
const loadingModes = ["semicircle", "circle", "flower"];
const loadingProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 显示加载状态
   */
  show: Boolean,
  /**
   * @description 加载动画
   */
  animation: Boolean,
  /**
   * @description 加载模式
   */
  mode: {
    type: String,
    values: loadingModes,
    default: "circle"
  },
  /**
   * @description 加载颜色类型
   */
  type: {
    type: String,
    values: uni_modules_tuniaouiVue3_constants_types.componentTypes,
    default: "primary"
  },
  /**
   * @description 颜色，以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 加载动画大小
   */
  size: {
    type: [String, Number]
  },
  /**
   * @description 加载动画执行时间，单位s
   */
  duration: {
    type: [String, Number]
  },
  /**
   * @description 加载动画执行时间函数，仅mode为circle和semicircle时有效
   */
  timeFunction: String
});
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "loading",
  props: loadingProps,
  setup(__props) {
    const props = __props;
    const {
      ns,
      loadingClass,
      loadingStyle,
      loadingContentClass,
      loadingContentStyle
    } = uni_modules_tuniaouiVue3_components_loading_src_composables_loadingCustom.useLoadingCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.show
      }, _ctx.show ? common_vendor.e({
        b: _ctx.mode === "semicircle"
      }, _ctx.mode === "semicircle" ? {
        c: common_vendor.n(common_vendor.unref(ns).e("semicircle"))
      } : {}, {
        d: _ctx.mode === "circle" || _ctx.mode === "semicircle"
      }, _ctx.mode === "circle" || _ctx.mode === "semicircle" ? {
        e: common_vendor.n(common_vendor.unref(ns).e("circle")),
        f: common_vendor.n(common_vendor.unref(loadingContentClass)),
        g: common_vendor.s(common_vendor.unref(loadingContentStyle))
      } : {}, {
        h: _ctx.mode === "flower"
      }, _ctx.mode === "flower" ? {
        i: common_vendor.f(12, (i, k0, i0) => {
          return {
            a: i
          };
        }),
        j: common_vendor.n(common_vendor.unref(ns).em("flower", "item")),
        k: common_vendor.n(common_vendor.unref(ns).e("flower")),
        l: common_vendor.n(common_vendor.unref(loadingContentClass)),
        m: common_vendor.s(common_vendor.unref(loadingContentStyle))
      } : {}, {
        n: common_vendor.n(common_vendor.unref(loadingClass)),
        o: common_vendor.s(common_vendor.unref(loadingStyle))
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d91df98"]]);
wx.createComponent(Component);
