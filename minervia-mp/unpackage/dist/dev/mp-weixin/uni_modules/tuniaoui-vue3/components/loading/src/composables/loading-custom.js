"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentSize_index = require("../../../../hooks/use-component-size/index.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_dom_unit = require("../../../../utils/dom/unit.js");
require("../../../../hooks/use-z-index/index.js");
const useLoadingCustomStyle = (props) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("loading");
  const [colorClass, colorStyle, updateColor] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "color"),
    "bg"
  );
  const { sizeType } = uni_modules_tuniaouiVue3_hooks_useComponentSize_index.useComponentSize(props.size);
  const loadingClass = common_vendor.computed(() => {
    const cls = [];
    cls.push(ns.b());
    if (props.size && sizeType.value === "inner")
      cls.push(ns.m(props.size));
    return cls.join(" ");
  });
  const loadingStyle = common_vendor.computed(() => {
    const style = {};
    if (props.size && sizeType.value === "custom")
      style.width = style.height = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.size);
    return style;
  });
  const loadingContentClass = common_vendor.computed(() => {
    const cls = [];
    cls.push(ns.b());
    if (props.animation)
      cls.push(ns.m("animation"));
    return cls.join(" ");
  });
  const loadingContentStyle = common_vendor.computed(() => {
    const style = {};
    if (props.type)
      style["--loading-color"] = `var(--tn-color-${props.type})`;
    if (props.color && colorClass.value) {
      const color = props.color.replace("tn-", "");
      style["--loading-color"] = `var(--tn-color-${color})`;
    }
    if (colorStyle.value)
      style["--loading-color"] = colorStyle.value;
    if (props.duration)
      style.animationDuration = `${props.duration}s`;
    if (props.mode === "circle" || props.mode === "semicircle") {
      if (props.timeFunction)
        style.animationTimingFunction = props.timeFunction;
    }
    return style;
  });
  return {
    ns,
    loadingClass,
    loadingStyle,
    loadingContentClass,
    loadingContentStyle,
    updateColor
  };
};
exports.useLoadingCustomStyle = useLoadingCustomStyle;
