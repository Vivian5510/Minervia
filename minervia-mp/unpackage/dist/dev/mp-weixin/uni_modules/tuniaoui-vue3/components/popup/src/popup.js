"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_constants_event = require("../../../constants/event.js");
const uni_modules_tuniaouiVue3_constants_zIndex = require("../../../constants/z-index.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_libs_lodash_isBoolean = require("../../../libs/lodash/is-boolean.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index = require("../../base/composables/use-component-common-props/index.js");
const uni_modules_tuniaouiVue3_components_overlay_index = require("../../overlay/index.js");
const uni_modules_tuniaouiVue3_components_popup_src_composables_popupCustom = require("./composables/popup-custom.js");
const uni_modules_tuniaouiVue3_components_popup_src_composables_usePopup = require("./composables/use-popup.js");
const popupOpenDirection = [
  "top",
  "bottom",
  "left",
  "right",
  "center"
];
const popupCloseBtnPosition = [
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom"
];
const popupProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 控制弹框是否显示
   */
  modelValue: Boolean,
  /**
   * @description 弹框打开的方向
   */
  openDirection: {
    type: String,
    values: popupOpenDirection,
    default: "center"
  },
  /**
   * @description 弹窗的宽度，在 openDirection 为 left 或 right 或 center 时生效
   */
  width: {
    type: [String, Number]
  },
  /**
   * @description 弹窗的高度，在 openDirection 为 top 或 bottom 或 center 时生效
   */
  height: {
    type: [String, Number]
  },
  /**
   * @description 弹框的内容的背景颜色
   */
  bgColor: {
    type: String,
    default: "#fff"
  },
  /**
   * @description 弹框的内容的圆角
   */
  radius: {
    type: [String, Number],
    default: 15
  },
  /**
   * @description 是否显示overlay遮罩层
   */
  overlay: {
    type: Boolean,
    default: true
  },
  /**
   * @description overlay遮罩层的透明度
   */
  overlayOpacity: uni_modules_tuniaouiVue3_components_overlay_index.overlayProps["opacity"],
  /**
   * @description 点击overlay关闭弹框
   */
  overlayCloseable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示关闭按钮
   */
  closeBtn: Boolean,
  /**
   * @description 关闭按钮的位置
   */
  closeBtnPosition: {
    type: String,
    values: popupCloseBtnPosition,
    default: "right-top"
  },
  /**
   * @description 底部是否开启安全区域
   */
  safeAreaInsetBottom: uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index.useComponentSafeAreaInsetBottomProp,
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: uni_modules_tuniaouiVue3_constants_zIndex.ZIndex.popup
  },
  /**
   * @description 距离顶部的距离，在 openDirection 为 top 或 left 或 right 时生效，默认单位为`px`
   */
  top: {
    type: [String, Number]
  }
});
const popupEmits = {
  [uni_modules_tuniaouiVue3_constants_event.UPDATE_MODEL_EVENT]: (value) => uni_modules_tuniaouiVue3_libs_lodash_isBoolean.isBoolean(value),
  open: () => true,
  close: () => true,
  ["overlay-click"]: () => true
};
if (!Math) {
  (TnOverlay + TnIcon)();
}
const TnOverlay = () => "../../overlay/src/overlay.js";
const TnIcon = () => "../../icon/src/icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "popup",
  props: popupProps,
  emits: popupEmits,
  setup(__props) {
    const props = __props;
    const {
      iosDevice,
      showOverlay,
      showPopup,
      visiblePopup,
      onClickCloseBtn,
      onClickOverlay
    } = uni_modules_tuniaouiVue3_components_popup_src_composables_usePopup.usePopup(props);
    const { ns, overlayZIndex, zIndex, popupContentClass, popupContentStyle } = uni_modules_tuniaouiVue3_components_popup_src_composables_popupCustom.usePopupCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(iosDevice) || common_vendor.unref(iosDevice) && common_vendor.unref(visiblePopup)
      }, !common_vendor.unref(iosDevice) || common_vendor.unref(iosDevice) && common_vendor.unref(visiblePopup) ? common_vendor.e({
        b: common_vendor.o(common_vendor.unref(onClickOverlay)),
        c: common_vendor.p({
          show: common_vendor.unref(showOverlay),
          ["z-index"]: common_vendor.unref(overlayZIndex),
          opacity: _ctx.overlayOpacity
        }),
        d: _ctx.closeBtn
      }, _ctx.closeBtn ? {
        e: common_vendor.p({
          name: "close"
        }),
        f: common_vendor.n(common_vendor.unref(ns).e("close-btn")),
        g: common_vendor.n(common_vendor.unref(ns).em("close-btn", _ctx.closeBtnPosition)),
        h: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onClickCloseBtn) && common_vendor.unref(onClickCloseBtn)(...args)
        )
      } : {}, {
        i: common_vendor.n(common_vendor.unref(popupContentClass)),
        j: common_vendor.s(common_vendor.unref(popupContentStyle)),
        k: common_vendor.n(common_vendor.unref(ns).b()),
        l: common_vendor.n(common_vendor.unref(ns).is("show", common_vendor.unref(showPopup))),
        m: common_vendor.n(common_vendor.unref(ns).is("visible", common_vendor.unref(visiblePopup))),
        n: common_vendor.unref(zIndex)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a600c819"]]);
wx.createComponent(Component);
