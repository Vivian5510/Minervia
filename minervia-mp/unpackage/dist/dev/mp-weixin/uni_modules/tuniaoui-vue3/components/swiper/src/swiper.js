"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const uni_modules_tuniaouiVue3_libs_lodash_isNumber = require("../../../libs/lodash/is-number.js");
require("../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_constants_event = require("../../../constants/event.js");
const uni_modules_tuniaouiVue3_components_swiper_src_composables_swiperCustom = require("./composables/swiper-custom.js");
const uni_modules_tuniaouiVue3_components_swiper_src_composables_useSwiper = require("./composables/use-swiper.js");
const swiperIndicatorPosition = [
  "left-top",
  "center-top",
  "right-top",
  "left-bottom",
  "center-bottom",
  "right-bottom"
];
const swiperIndicatorType = ["line", "dot", "number"];
const swiperProps = uni_modules_tuniaouiVue3_utils_vue_props_runtime.buildProps({
  /**
   * @description 当前选中item的索引值
   */
  modelValue: {
    type: Number,
    default: 0
  },
  /**
   * @description swiper数据源
   */
  data: {
    type: uni_modules_tuniaouiVue3_utils_vue_props_runtime.definePropType(Array),
    default: []
  },
  /**
   * @description 空白swiper的数量，如果设置了data则以data的数据为准
   */
  blankCount: Number,
  /**
   * @description 轮播图的宽度，默认单位rpx
   */
  width: String,
  /**
   * @description 轮播图的高度，默认单位rpx
   */
  height: String,
  /**
   * @description 是否自动播放
   */
  autoplay: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动播放的时间间隔，单位ms
   */
  interval: {
    type: Number,
    default: 5e3
  },
  /**
   * @description 动画时长，单位ms
   */
  duration: {
    type: Number,
    default: 500
  },
  /**
   * @description 是否循环播放
   */
  loop: {
    type: Boolean,
    default: false
  },
  /**
   * @description 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
   */
  previousMargin: {
    type: String,
    default: "0px"
  },
  /**
   * @description 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
   */
  nextMargin: {
    type: String,
    default: "0px"
  },
  /**
   * @description 是否显示指示器
   */
  indicator: Boolean,
  /**
   * @description 指示器的位置
   */
  indicatorPosition: {
    type: String,
    values: swiperIndicatorPosition,
    default: "center-bottom"
  },
  /**
   * @description 指示器的类型
   */
  indicatorType: {
    type: String,
    values: swiperIndicatorType,
    default: "dot"
  },
  /**
   * @description 指示器颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorBgColor: String,
  /**
   * @description 指示器激活时的颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorActiveBgColor: String,
  /**
   * @description 指示器文本颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorTextColor: String
});
const swiperEmits = {
  [uni_modules_tuniaouiVue3_constants_event.UPDATE_MODEL_EVENT]: (value) => uni_modules_tuniaouiVue3_libs_lodash_isNumber.isNumber(value),
  /**
   * @description 选项发生改变时触发
   */
  [uni_modules_tuniaouiVue3_constants_event.CHANGE_EVENT]: (value) => uni_modules_tuniaouiVue3_libs_lodash_isNumber.isNumber(value),
  /**
   * @description item点击事件
   */
  "item-click": (value) => uni_modules_tuniaouiVue3_libs_lodash_isNumber.isNumber(value)
};
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "swiper",
  props: swiperProps,
  emits: swiperEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      swiperData,
      currentSwiperIndex,
      swiperCount,
      swiperChangeHandle,
      itemClickHandle
    } = uni_modules_tuniaouiVue3_components_swiper_src_composables_useSwiper.useSwiper(props, emits);
    const { ns, swiperStyle, indicatorColorClass, indicatorColorStyle } = uni_modules_tuniaouiVue3_components_swiper_src_composables_swiperCustom.useSwiperCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(swiperData), (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              active: index === common_vendor.unref(currentSwiperIndex),
              data: item
            }, i0),
            c: index
          };
        }),
        b: common_vendor.n(common_vendor.unref(ns).e("swiper-item")),
        c: common_vendor.n(common_vendor.unref(ns).e("swiper")),
        d: common_vendor.unref(currentSwiperIndex),
        e: _ctx.autoplay,
        f: _ctx.interval,
        g: _ctx.duration,
        h: _ctx.loop,
        i: _ctx.previousMargin,
        j: _ctx.nextMargin,
        k: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(swiperChangeHandle) && common_vendor.unref(swiperChangeHandle)(...args)
        ),
        l: common_vendor.n(common_vendor.unref(ns).e("wrapper")),
        m: _ctx.indicator
      }, _ctx.indicator ? common_vendor.e({
        n: _ctx.indicatorType === "line"
      }, _ctx.indicatorType === "line" ? {
        o: common_vendor.n(common_vendor.unref(indicatorColorClass)(true)),
        p: common_vendor.s(common_vendor.unref(indicatorColorStyle)(true)),
        q: `${(100 / common_vendor.unref(swiperData).length).toFixed(2)}%`,
        r: `translateX(${100 * common_vendor.unref(currentSwiperIndex)}%)`,
        s: common_vendor.n(common_vendor.unref(indicatorColorClass)(false)),
        t: common_vendor.s(common_vendor.unref(indicatorColorStyle)(false)),
        v: common_vendor.n(common_vendor.unref(ns).e("indicator-line"))
      } : {}, {
        w: _ctx.indicatorType === "dot"
      }, _ctx.indicatorType === "dot" ? {
        x: common_vendor.f(common_vendor.unref(swiperCount), (_, i, i0) => {
          return {
            a: i,
            b: common_vendor.n(common_vendor.unref(indicatorColorClass)(i === common_vendor.unref(currentSwiperIndex))),
            c: common_vendor.n({
              active: i === common_vendor.unref(currentSwiperIndex)
            }),
            d: common_vendor.s(common_vendor.unref(indicatorColorStyle)(i === common_vendor.unref(currentSwiperIndex)))
          };
        }),
        y: common_vendor.n(common_vendor.unref(ns).e("indicator-dot"))
      } : {}, {
        z: _ctx.indicatorType === "number"
      }, _ctx.indicatorType === "number" ? {
        A: common_vendor.t(common_vendor.unref(currentSwiperIndex) + 1),
        B: common_vendor.t(common_vendor.unref(swiperCount)),
        C: common_vendor.n(common_vendor.unref(indicatorColorClass)(false)),
        D: common_vendor.s(common_vendor.unref(indicatorColorStyle)(false)),
        E: common_vendor.n(common_vendor.unref(ns).e("indicator-number"))
      } : {}, {
        F: common_vendor.n(common_vendor.unref(ns).e("indicator")),
        G: common_vendor.n(common_vendor.unref(ns).em("indicator", _ctx.indicatorPosition))
      }) : {}, {
        H: common_vendor.n(common_vendor.unref(ns).b()),
        I: common_vendor.s(common_vendor.unref(swiperStyle)),
        J: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(itemClickHandle) && common_vendor.unref(itemClickHandle)(...args)
        )
      });
    };
  }
});
wx.createComponent(_sfc_main);
