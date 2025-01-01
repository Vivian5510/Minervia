"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_dom_unit = require("../../../../utils/dom/unit.js");
require("../../../../hooks/use-z-index/index.js");
const usePopupCustomStyle = (props) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("popup");
  const zIndex = common_vendor.computed(() => Number(props.zIndex));
  const overlayZIndex = common_vendor.computed(() => zIndex.value - 1);
  const [contentBgColorClass, contentBgColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "bgColor"),
    "bg"
  );
  const popupContentClass = common_vendor.computed(() => {
    const cls = [ns.e("content")];
    if (props.openDirection)
      cls.push(ns.em("content", props.openDirection));
    if (props.openDirection === "bottom" && props.safeAreaInsetBottom) {
      cls.push("tn-u-safe-area");
    }
    if (contentBgColorClass.value)
      cls.push(contentBgColorClass.value);
    return cls.join(" ");
  });
  const popupContentStyle = common_vendor.computed(() => {
    const style = {};
    if (contentBgColorStyle.value)
      style.backgroundColor = contentBgColorStyle.value;
    if (props.radius) {
      style.overflow = "hidden";
      if (props.openDirection === "center") {
        style.borderRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "top") {
        style.borderBottomLeftRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomRightRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "left") {
        style.borderTopRightRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomRightRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "right") {
        style.borderTopLeftRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomLeftRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "bottom") {
        style.borderTopLeftRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderTopRightRadius = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.radius);
      }
    }
    if (props.top && (props.openDirection === "top" || props.openDirection === "left" || props.openDirection === "right")) {
      style.top = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.top, "px");
    }
    if (props.width && (props.openDirection === "left" || props.openDirection === "right" || props.openDirection === "center")) {
      style.width = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.width);
    }
    if (props.height && (props.openDirection === "top" || props.openDirection === "bottom" || props.openDirection === "center")) {
      style.height = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.height);
    }
    if (props.openDirection === "left" || props.openDirection === "right") {
      if (props.top)
        style.height = `calc(100% - ${uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.top, "px")})`;
    }
    style.zIndex = zIndex.value;
    return style;
  });
  return {
    ns,
    zIndex,
    overlayZIndex,
    popupContentClass,
    popupContentStyle
  };
};
exports.usePopupCustomStyle = usePopupCustomStyle;
