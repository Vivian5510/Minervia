"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_types = require("../../../../utils/types.js");
const uni_modules_tuniaouiVue3_utils_dom_unit = require("../../../../utils/dom/unit.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
const uni_modules_tuniaouiVue3_hooks_useComponentSize_index = require("../../../../hooks/use-component-size/index.js");
const useIcon = (props) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("icon");
  const [colorClass, colorStyle, updateColor] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "color"),
    "text"
  );
  const [transparentBgClass] = uni_modules_tuniaouiVue3_hooks_useComponentColor_index.useComponentColor(common_vendor.toRef(props, "transparentBg"), "bg");
  const { sizeType } = uni_modules_tuniaouiVue3_hooks_useComponentSize_index.useComponentSize(props.size);
  const isImg = common_vendor.computed(
    () => !!(props == null ? void 0 : props.name) && props.name.includes("/")
  );
  const iconClass = common_vendor.computed(() => {
    const cls = [];
    cls.push(ns.b());
    if (isImg.value) {
      cls.push(ns.m("image"));
    } else {
      if (props.type)
        cls.push(`tn-type-${props.type}_text`);
      if (props.transparent) {
        cls.push("tn-text-transparent", transparentBgClass.value);
      } else {
        if (colorClass.value)
          cls.push(colorClass.value);
      }
      if (props.bold)
        cls.push("tn-text-bold");
    }
    if (sizeType.value === "inner")
      cls.push(ns.m(props.size));
    if (props.customClass)
      cls.push(props.customClass);
    return cls.join(" ");
  });
  const iconStyle = common_vendor.computed(() => {
    const style = {};
    if (isImg.value) {
      if (sizeType.value === "custom" && props.size) {
        style.width = style.height = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.size);
      }
    } else {
      if (colorStyle.value)
        style.color = colorStyle.value;
      if (sizeType.value === "custom" && props.size)
        style.fontSize = uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.size);
    }
    if (props.offsetTop)
      style.transform = `translateY(${uni_modules_tuniaouiVue3_utils_dom_unit.formatDomSizeValue(props.offsetTop)})`;
    if (!uni_modules_tuniaouiVue3_utils_types.isEmpty(props.customStyle))
      Object.assign(style, props.customStyle);
    return style;
  });
  return {
    isImg,
    iconClass,
    iconStyle,
    updateColor
  };
};
exports.useIcon = useIcon;
