"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_constants_event = require("../../../constants/event.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_libs_lodash_isBoolean = require("../../../libs/lodash/is-boolean.js");
const uni_modules_tuniaouiVue3_libs_lodash_isNumber = require("../../../libs/lodash/is-number.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_components_base_commonProps_picker_index = require("../../base/common-props/picker/index.js");
const uni_modules_tuniaouiVue3_components_picker_src_composables_pickerCustom = require("./composables/picker-custom.js");
const uni_modules_tuniaouiVue3_components_picker_src_composables_usePicker = require("./composables/use-picker.js");
const pickerProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  ...uni_modules_tuniaouiVue3_components_base_commonProps_picker_index.pickerBaseProps,
  /**
   * @description picker绑定的值
   */
  modelValue: {
    type: uni_modules_tuniaouiVue3_utils_vue_props_runtime.definePropType([String, Number, Array]),
    default: ""
  },
  /**
   * @description 显示picker选项弹框
   */
  open: Boolean,
  /**
   * @description picker选项的数据
   */
  data: {
    type: uni_modules_tuniaouiVue3_utils_vue_props_runtime.definePropType([Array]),
    default: () => []
  },
  /**
   * @description picker选项的数据label属性名
   */
  labelKey: {
    type: String,
    default: "label"
  },
  /**
   * @description picker选项的数据value属性名
   */
  valueKey: {
    type: String,
    default: "value"
  },
  /**
   * @description picker选项的数据children属性名, 在级联选择器模式下生效
   */
  childrenKey: {
    type: String,
    default: "children"
  }
});
const pickerEmits = {
  [uni_modules_tuniaouiVue3_constants_event.UPDATE_MODEL_EVENT]: (value) => common_vendor.isString(value) || uni_modules_tuniaouiVue3_libs_lodash_isNumber.isNumber(value) || common_vendor.isArray(value),
  "update:open": (value) => uni_modules_tuniaouiVue3_libs_lodash_isBoolean.isBoolean(value),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [uni_modules_tuniaouiVue3_constants_event.CHANGE_EVENT]: (value, index, item) => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  confirm: (value, item) => true,
  cancel: () => true,
  close: () => true
};
if (!Math) {
  TnPopup();
}
const TnPopup = () => "../../popup/src/popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "picker",
  props: pickerProps,
  emits: pickerEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      openPopup,
      showPicker,
      pickerData,
      currentPickerIndex,
      closePopupEvent,
      pickerViewChangeEvent,
      confirmEvent,
      cancelEvent,
      initDefaultPickerIndex,
      resetPickerIndexWithPosition
    } = uni_modules_tuniaouiVue3_components_picker_src_composables_usePicker.usePicker(props);
    const { ns, overlayOpacity, operationBtnClass, operationBtnStyle } = uni_modules_tuniaouiVue3_components_picker_src_composables_pickerCustom.usePickerCustomStyle(props);
    const resetPickerViewIndex = () => {
      initDefaultPickerIndex();
    };
    __expose({
      /**
       * @description: 重置选择器的值
       */
      resetPickerViewIndex,
      /**
       * @description: 重置指定位置选择器的值
       */
      resetPickerIndexWithPosition
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.showCancel
      }, _ctx.showCancel ? {
        b: common_vendor.t(props.cancelText),
        c: common_vendor.n(common_vendor.unref(operationBtnClass)("cancel")),
        d: common_vendor.s(common_vendor.unref(operationBtnStyle)("cancel")),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(cancelEvent) && common_vendor.unref(cancelEvent)(...args)
        )
      } : {}, {
        f: common_vendor.t(props.confirmText),
        g: common_vendor.n(common_vendor.unref(operationBtnClass)("confirm")),
        h: common_vendor.s(common_vendor.unref(operationBtnStyle)("confirm")),
        i: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(confirmEvent) && common_vendor.unref(confirmEvent)(...args)
        ),
        j: common_vendor.n(common_vendor.unref(ns).e("operation")),
        k: common_vendor.n(common_vendor.unref(ns).is("only-confirm", !_ctx.showCancel)),
        l: common_vendor.unref(showPicker)
      }, common_vendor.unref(showPicker) ? {
        m: common_vendor.f(common_vendor.unref(pickerData), (item, index, i0) => {
          return {
            a: common_vendor.f(item, (dItem, dIndex, i1) => {
              return {
                a: common_vendor.t(dItem["label"]),
                b: dIndex
              };
            }),
            b: index
          };
        }),
        n: common_vendor.n(common_vendor.unref(ns).em("content-item", "data")),
        o: common_vendor.n(common_vendor.unref(ns).e("content-item")),
        p: common_vendor.n(common_vendor.unref(ns).e("picker-view-column")),
        q: common_vendor.n(common_vendor.unref(ns).e("picker-view")),
        r: common_vendor.unref(currentPickerIndex),
        s: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(pickerViewChangeEvent) && common_vendor.unref(pickerViewChangeEvent)(...args)
        )
      } : {}, {
        t: common_vendor.n(common_vendor.unref(ns).e("content")),
        v: common_vendor.n(common_vendor.unref(ns).b()),
        w: common_vendor.o(common_vendor.unref(closePopupEvent)),
        x: common_vendor.o(($event) => common_vendor.isRef(openPopup) ? openPopup.value = $event : null),
        y: common_vendor.p({
          ["open-direction"]: "bottom",
          overlay: true,
          ["overlay-opacity"]: common_vendor.unref(overlayOpacity),
          radius: 0,
          ["safe-area-inset-bottom"]: false,
          ["z-index"]: _ctx.zIndex,
          modelValue: common_vendor.unref(openPopup)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39b2bba5"]]);
wx.createComponent(Component);
