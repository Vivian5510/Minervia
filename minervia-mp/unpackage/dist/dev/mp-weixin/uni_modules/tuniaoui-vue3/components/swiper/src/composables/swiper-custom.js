"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_dom_unit = require("../../../../utils/dom/unit.js");
require("../../../../hooks/use-z-index/index.js");
const useSwiperCustomStyle = (props) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("swiper");
  const [indicatorBgColorClass, indicatorBgColoeStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "indicatorBgColor"),
    "bg"
  );
  const [indicatorTextColorClass, indicatorTextColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "indicatorTextColor"),
    "text"
  );
  const [indicatorActiveBgColorClass, indicatorActiveBgColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(common_vendor.toRef(props, "indicatorActiveBgColor"), "bg");
  const swiperStyle = common_vendor.computed(() => {
    const style = {};
    if (props.width !== void 0)
      style.width = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.width);
    if (props.height !== void 0)
      style.height = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.height);
    return style;
  });
  const indicatorColorClass = common_vendor.computed(() => {
    return (active) => {
      const cls = [];
      if (props.indicatorType === "number") {
        if (indicatorBgColorClass.value)
          cls.push(indicatorBgColorClass.value);
        if (indicatorTextColorClass.value)
          cls.push(indicatorTextColorClass.value);
      } else {
        if (active) {
          if (indicatorActiveBgColorClass.value)
            cls.push(indicatorActiveBgColorClass.value);
        } else {
          if (indicatorBgColorClass.value)
            cls.push(indicatorBgColorClass.value);
        }
      }
      return cls.join(" ");
    };
  });
  const indicatorColorStyle = common_vendor.computed(() => {
    return (active) => {
      const style = {};
      if (props.indicatorType === "number") {
        if (!indicatorBgColorClass.value) {
          style.backgroundColor = indicatorBgColoeStyle.value || "rgba(0, 0, 0, 0.25)";
        }
        if (indicatorTextColorStyle.value) {
          style.color = indicatorTextColorStyle.value;
        } else if (!indicatorTextColorClass.value && !indicatorBgColorClass.value) {
          style.color = "var(--tn-color-white)";
        }
      } else {
        if (active) {
          if (!indicatorActiveBgColorClass.value)
            style.backgroundColor = indicatorActiveBgColorStyle.value || "var(--tn-color-white)";
        } else {
          if (!indicatorBgColorClass.value)
            style.backgroundColor = indicatorBgColoeStyle.value || "rgba(0, 0, 0, 0.25)";
        }
      }
      return style;
    };
  });
  return {
    ns,
    swiperStyle,
    indicatorColorClass,
    indicatorColorStyle
  };
};
exports.useSwiperCustomStyle = useSwiperCustomStyle;
