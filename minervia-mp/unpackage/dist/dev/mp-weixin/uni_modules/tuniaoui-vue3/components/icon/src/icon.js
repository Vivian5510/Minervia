"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_utils_vue_icon = require("../../../utils/vue/icon.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_constants_imgMode = require("../../../constants/img-mode.js");
const uni_modules_tuniaouiVue3_constants_types = require("../../../constants/types.js");
const uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index = require("../../base/composables/use-component-common-props/index.js");
const uni_modules_tuniaouiVue3_components_icon_src_composables_iconCustom = require("./composables/icon-custom.js");
const iconProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 图标名称，支持图鸟内置图标和图片地址(只支持绝对路径)
   */
  name: {
    type: uni_modules_tuniaouiVue3_utils_vue_icon.iconPropType,
    required: true
  },
  /**
   * @description 图标颜色类型
   */
  type: {
    type: String,
    values: uni_modules_tuniaouiVue3_constants_types.componentTypes,
    default: ""
  },
  /**
   * @description 图标颜色, 以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 图标大小
   */
  size: {
    type: [String, Number]
  },
  /**
   * @description 图标加粗
   */
  bold: Boolean,
  /**
   * @description 图标是否为透明
   */
  transparent: Boolean,
  /**
   * @description 透明图标背景
   */
  transparentBg: String,
  /**
   * @description 图片模式，当name为图片地址时生效
   */
  imgMode: {
    type: String,
    values: uni_modules_tuniaouiVue3_constants_imgMode.componentImgModes,
    default: "aspectFill"
  },
  /**
   * @description 垂直方向上的偏移量
   */
  offsetTop: {
    type: [String, Number]
  },
  /**
   * @description 自定义样式
   */
  customStyle: uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index.useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String
});
const iconEmits = {
  /**
   * @description 点击图标时触发
   */
  click: () => true
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "icon",
  props: iconProps,
  emits: iconEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { isImg, iconClass, iconStyle } = uni_modules_tuniaouiVue3_components_icon_src_composables_iconCustom.useIcon(props);
    const handleClick = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isImg)
      }, common_vendor.unref(isImg) ? {
        b: _ctx.name,
        c: _ctx.imgMode
      } : {
        d: common_vendor.n(`tn-icon-${_ctx.name}`)
      }, {
        e: common_vendor.n(common_vendor.unref(iconClass)),
        f: common_vendor.s(common_vendor.unref(iconStyle)),
        g: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bcc701d5"]]);
wx.createComponent(Component);
