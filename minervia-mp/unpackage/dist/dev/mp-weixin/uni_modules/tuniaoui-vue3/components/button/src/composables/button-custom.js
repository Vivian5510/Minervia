"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_types = require("../../../../utils/types.js");
const uni_modules_tuniaouiVue3_utils_dom_unit = require("../../../../utils/dom/unit.js");
require("../../../../hooks/use-z-index/index.js");
const useButtonCustomStyle = (props) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("button");
  const [bgColorClass, bgColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "bgColor"),
    "bg"
  );
  const [textColorClass, textColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "textColor"),
    "text"
  );
  const [borderColorClass, borderColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "borderColor"),
    "border"
  );
  const [shadowColorClass, shadowColorStyle] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "shadowColor"),
    "shadow"
  );
  const buttonClass = common_vendor.computed(() => {
    const cls = [ns.b()];
    if (props.onlyButton) {
      cls.push(ns.m("only-button"));
      return cls.join(" ");
    }
    if (props.text)
      cls.push(ns.m("text"));
    if (props.plain) {
      cls.push(ns.m("plain"));
      if (props.borderBold)
        cls.push(ns.m("plain-bold"));
    }
    if (props.type) {
      if (props.text) {
        if (!props.textColor)
          cls.push(`tn-type-${props.type}_text`);
      } else if (props.plain) {
        if (!props.borderColor)
          cls.push(`tn-type-${props.type}_border`);
      } else {
        if (!props.bgColor)
          cls.push(`tn-type-${props.type}_bg`);
      }
    }
    if (props.size)
      cls.push(ns.m(props.size));
    if (!props.text && props.shape)
      cls.push(ns.m(props.shape));
    if (props.bold)
      cls.push("tn-text-bold");
    if (!props.text && !props.plain) {
      if (bgColorClass.value)
        cls.push(bgColorClass.value);
    }
    if (textColorClass.value)
      cls.push(textColorClass.value);
    if (props.plain) {
      if (borderColorClass.value)
        cls.push(borderColorClass.value);
    }
    if (props.shadow) {
      cls.push("tn-shadow");
      if (shadowColorClass.value)
        cls.push(shadowColorClass.value);
    }
    if (props.customClass)
      cls.push(props.customClass);
    return cls.join(" ");
  });
  const buttonStyle = common_vendor.computed(() => {
    const style = {};
    if (props.onlyButton)
      return style;
    if (props.width) {
      style.width = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.width);
      if (props.shape === "circle")
        style.height = style.width;
    }
    if (props.height && props.shape !== "circle")
      style.height = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.height);
    if (props.fontSize)
      style.fontSize = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.fontSize);
    if (!props.text && !props.plain) {
      if (bgColorStyle.value)
        style.backgroundColor = bgColorStyle.value;
    }
    if (textColorStyle.value) {
      style.color = textColorStyle.value;
    }
    if (props.plain && borderColorStyle.value) {
      style.borderColor = borderColorStyle.value;
    }
    if (props.shadow && shadowColorStyle.value)
      style.boxShadow = shadowColorStyle.value;
    if (!uni_modules_tuniaouiVue3_utils_types.isEmpty(props.customStyle)) {
      Object.assign(style, props.customStyle);
    }
    return style;
  });
  return {
    ns,
    buttonClass,
    buttonStyle
  };
};
exports.useButtonCustomStyle = useButtonCustomStyle;
