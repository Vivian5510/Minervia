"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_utils_vue_icon = require("../../../utils/vue/icon.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_constants_shape = require("../../../constants/shape.js");
const uni_modules_tuniaouiVue3_constants_types = require("../../../constants/types.js");
const uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index = require("../../base/composables/use-component-common-props/index.js");
const uni_modules_tuniaouiVue3_components_button_src_composables_buttonCustom = require("./composables/button-custom.js");
const uni_modules_tuniaouiVue3_components_button_src_composables_useButton = require("./composables/use-button.js");
const buttonFormTypes = ["submit", "reset"];
const buttonOpenTypes = [
  "feedback",
  "share",
  "contact",
  "getPhoneNumber",
  "getRealtimePhoneNumber",
  "launchApp",
  "openSetting",
  "getUserInfo",
  "chooseAvatar",
  "agreePrivacyAuthorization"
];
const buttonProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 按钮宽度
   */
  width: {
    type: [String, Number]
  },
  /**
   * @description 按钮高度
   */
  height: {
    type: [String, Number]
  },
  /**
   * @description 按钮尺寸
   */
  size: uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index.useComponentSizeProp,
  /**
   * @description 按钮形状
   */
  shape: {
    type: String,
    values: uni_modules_tuniaouiVue3_constants_shape.componentShapes,
    default: ""
  },
  /**
   * @description 按钮颜色类型
   */
  type: {
    type: String,
    values: uni_modules_tuniaouiVue3_constants_types.componentTypes,
    default: "primary"
  },
  /**
   * @description 按钮图标
   */
  icon: {
    type: uni_modules_tuniaouiVue3_utils_vue_icon.iconPropType
  },
  /**
   * @description 是否加粗字体
   */
  bold: Boolean,
  /**
   * @description 字体大小
   */
  fontSize: {
    type: [String, Number]
  },
  /**
   * @description 背景颜色，以tn开头则使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 文字颜色，以tn开头则使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 是否显示为文本按钮
   */
  text: Boolean,
  /**
   * @description 是否为朴素按钮
   */
  plain: Boolean,
  /**
   * @description 边框颜色，以tn开头则使用图鸟内置的颜色
   */
  borderColor: String,
  /**
   * @description 是否加粗边框
   */
  borderBold: Boolean,
  /**
   * @description 是否显示阴影
   */
  shadow: Boolean,
  /**
   * @description 阴影颜色，以tn开头则使用图鸟内置的颜色
   */
  shadowColor: String,
  /**
   * @description 点击时触发的类
   */
  hoverClass: {
    type: String,
    default: "tn-u-btn-hover"
  },
  /**
   * @description 自定义样式
   */
  customStyle: uni_modules_tuniaouiVue3_components_base_composables_useComponentCommonProps_index.useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String,
  /**
   * @description 是否禁用按钮
   */
  disabled: Boolean,
  /**
   * @description 是否只为一个按钮，不作用任何样式
   */
  onlyButton: Boolean,
  /**
   * @description 是否显示加载中
   */
  loading: Boolean,
  /**
   * @description 是否防抖
   */
  debounce: {
    type: Boolean,
    default: false
  },
  /**
   * @description 触发form表单的事件类型
   */
  formType: {
    type: String,
    values: buttonFormTypes
  },
  /**
   * @description 按钮开放能力，具体能力参考官网https://uniapp.dcloud.io/component/button.html
   */
  openType: {
    type: String,
    values: buttonOpenTypes
  },
  /**
   * @description 打开app时向app传递的参数, 在微信、QQ小程序和openType为launchApp时生效
   */
  appParameter: {
    type: String,
    default: ""
  },
  /**
   * @description 会话来源, 在微信小程序和openType为contact时生效
   */
  sessionFrom: {
    type: String,
    default: ""
  },
  /**
   * @description 会话内消息卡片标题, 默认为当前标题, 在微信小程序和openType为contact时生效
   */
  sendMessageTitle: {
    type: String,
    default: ""
  },
  /**
   * @description 会话内消息卡片点击跳转小程序路径, 默认为当前路径, 在微信小程序和openType为contact时生效
   */
  sendMessagePath: {
    type: String,
    default: ""
  },
  /**
   * @description 会话内消息卡片图片, 默认为截图, 在微信小程序和openType为contact时生效
   */
  sendMessageImg: {
    type: String,
    default: ""
  },
  /**
   * @description 是否显示会话内消息卡片, 设置此参数为true, 用户进入客服会话会在右下角显示"可能要发送的小程序"提示, 用户点击后可以快速发送小程序消息, 在微信小程序和openType为contact时生效
   */
  showMessageCard: {
    type: Boolean,
    default: false
  },
  /**
   * @description 当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示
   */
  phoneNumberNoQuotaToast: {
    type: Boolean,
    default: true
  },
  clickModifiers: {
    type: String
  }
});
const buttonEmits = {
  /**
   * @description 按钮点击事件
   */
  click: () => true,
  /**
   * @description 获取用户手机号码回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getphonenumber: (e) => true,
  /**
   * @description 获取用户手机号实时验证回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getrealtimephonenumber: (e) => true,
  /**
   * @description 打开权限设置面板并关闭时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opensetting: (e) => true,
  /**
   * @description 打开APP成功时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  launchapp: (e) => true,
  /**
   * @description 获取用户信息回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getuserinfo: (e) => true,
  /**
   * @description 获取用户头像回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chooseavatar: (e) => true,
  /**
   * @description 同意隐私授权回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  agreeprivacyauthorization: (e) => true,
  /**
   * @description 客服消息回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contact: (e) => true,
  /**
   * @description 开放能力调用发生错误时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error: (e) => true
};
if (!Math) {
  (TnLoading + TnIcon)();
}
const TnIcon = () => "../../icon/src/icon.js";
const TnLoading = () => "../../loading/src/loading.js";
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "button",
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      buttonClick,
      getPhoneNumber,
      getRealTimePhoneNumber,
      openSetting,
      launchApp,
      getUserInfo,
      chooseAvatar,
      agreePrivacyAuthorization,
      contact,
      openTypeError
    } = uni_modules_tuniaouiVue3_components_button_src_composables_useButton.useButton(props, emits);
    const { ns, buttonClass, buttonStyle } = uni_modules_tuniaouiVue3_components_button_src_composables_buttonCustom.useButtonCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.clickModifiers === "stop"
      }, props.clickModifiers === "stop" ? common_vendor.e({
        b: _ctx.loading
      }, _ctx.loading ? {
        c: common_vendor.p({
          show: true,
          animation: true,
          mode: "flower",
          color: "tn-gray"
        }),
        d: common_vendor.n(common_vendor.unref(ns).m("loading"))
      } : {}, {
        e: _ctx.icon
      }, _ctx.icon ? {
        f: common_vendor.p({
          name: _ctx.icon
        }),
        g: common_vendor.n(common_vendor.unref(ns).e("icon"))
      } : {}, {
        h: common_vendor.n(common_vendor.unref(buttonClass)),
        i: common_vendor.s(common_vendor.unref(buttonStyle)),
        j: props.disabled || props.loading || props.onlyButton ? "" : _ctx.hoverClass,
        k: _ctx.disabled,
        l: _ctx.formType,
        m: _ctx.openType,
        n: _ctx.appParameter,
        o: _ctx.sessionFrom,
        p: _ctx.sendMessageTitle,
        q: _ctx.sendMessagePath,
        r: _ctx.sendMessageImg,
        s: _ctx.showMessageCard,
        t: _ctx.phoneNumberNoQuotaToast,
        v: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(buttonClick) && common_vendor.unref(buttonClick)(...args)
        ),
        w: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getPhoneNumber) && common_vendor.unref(getPhoneNumber)(...args)
        ),
        x: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getRealTimePhoneNumber) && common_vendor.unref(getRealTimePhoneNumber)(...args)
        ),
        y: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(openSetting) && common_vendor.unref(openSetting)(...args)
        ),
        z: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(launchApp) && common_vendor.unref(launchApp)(...args)
        ),
        A: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getUserInfo) && common_vendor.unref(getUserInfo)(...args)
        ),
        B: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(chooseAvatar) && common_vendor.unref(chooseAvatar)(...args)
        ),
        C: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(agreePrivacyAuthorization) && common_vendor.unref(agreePrivacyAuthorization)(...args)
        ),
        D: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(contact) && common_vendor.unref(contact)(...args)
        ),
        E: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(openTypeError) && common_vendor.unref(openTypeError)(...args)
        )
      }) : common_vendor.e({
        F: _ctx.loading
      }, _ctx.loading ? {
        G: common_vendor.p({
          show: true,
          animation: true,
          mode: "flower",
          color: "tn-gray"
        }),
        H: common_vendor.n(common_vendor.unref(ns).m("loading"))
      } : {}, {
        I: _ctx.icon
      }, _ctx.icon ? {
        J: common_vendor.p({
          name: _ctx.icon
        }),
        K: common_vendor.n(common_vendor.unref(ns).e("icon"))
      } : {}, {
        L: common_vendor.n(common_vendor.unref(buttonClass)),
        M: common_vendor.s(common_vendor.unref(buttonStyle)),
        N: props.disabled || props.loading || props.onlyButton ? "" : _ctx.hoverClass,
        O: _ctx.disabled,
        P: _ctx.formType,
        Q: _ctx.openType,
        R: _ctx.appParameter,
        S: _ctx.sessionFrom,
        T: _ctx.sendMessageTitle,
        U: _ctx.sendMessagePath,
        V: _ctx.sendMessageImg,
        W: _ctx.showMessageCard,
        X: _ctx.phoneNumberNoQuotaToast,
        Y: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(buttonClick) && common_vendor.unref(buttonClick)(...args)
        ),
        Z: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getPhoneNumber) && common_vendor.unref(getPhoneNumber)(...args)
        ),
        aa: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getRealTimePhoneNumber) && common_vendor.unref(getRealTimePhoneNumber)(...args)
        ),
        ab: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(openSetting) && common_vendor.unref(openSetting)(...args)
        ),
        ac: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(launchApp) && common_vendor.unref(launchApp)(...args)
        ),
        ad: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getUserInfo) && common_vendor.unref(getUserInfo)(...args)
        ),
        ae: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(chooseAvatar) && common_vendor.unref(chooseAvatar)(...args)
        ),
        af: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(agreePrivacyAuthorization) && common_vendor.unref(agreePrivacyAuthorization)(...args)
        ),
        ag: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(contact) && common_vendor.unref(contact)(...args)
        ),
        ah: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(openTypeError) && common_vendor.unref(openTypeError)(...args)
        )
      }));
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-055d4a7b"]]);
wx.createComponent(Component);
