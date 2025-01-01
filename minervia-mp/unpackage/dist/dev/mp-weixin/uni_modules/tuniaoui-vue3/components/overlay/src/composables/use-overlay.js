"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const uni_modules_tuniaouiVue3_utils_isEmpty = require("../../../../utils/is-empty.js");
require("../../../../libs/lodash/_baseToString.js");
require("../../../../hooks/use-z-index/index.js");
const useOverlay = (props, emits) => {
  const ns = uni_modules_tuniaouiVue3_hooks_useNamespace_index.useNamespace("overlay");
  const overlayClass = common_vendor.computed(() => {
    const cls = [ns.b()];
    if (props.show)
      cls.push(ns.m("show"));
    return cls.join(" ");
  });
  const overlayStyle = common_vendor.computed(() => {
    const style = {};
    style.transitionDuration = `${uni_modules_tuniaouiVue3_utils_isEmpty.isEmptyVariableInDefault(
      props.duration,
      300
    )}ms`;
    style.backgroundColor = `rgba(0, 0, 0, ${uni_modules_tuniaouiVue3_utils_isEmpty.isEmptyVariableInDefault(
      props.opacity,
      0.5
    )})`;
    if (props.zIndex)
      style.zIndex = props.zIndex;
    return style;
  });
  const overlayClick = () => {
    emits("update:show", false);
    emits("click");
  };
  return {
    ns,
    overlayClass,
    overlayStyle,
    overlayClick
  };
};
exports.useOverlay = useOverlay;
