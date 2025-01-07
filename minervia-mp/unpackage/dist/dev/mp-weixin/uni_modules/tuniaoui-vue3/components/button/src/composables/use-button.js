"use strict";
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_libs_lodash_debounce = require("../../../../libs/lodash/debounce.js");
const useButton = (props, emits) => {
  const buttonClickHandle = () => {
    if (props.disabled || props.loading)
      return;
    emits("click");
  };
  const buttonClick = props.debounce ? uni_modules_tuniaouiVue3_libs_lodash_debounce.debounce(buttonClickHandle, 250) : buttonClickHandle;
  const getPhoneNumber = (e) => {
    emits("getphonenumber", e);
  };
  const getRealTimePhoneNumber = (e) => {
    emits("getrealtimephonenumber", e);
  };
  const openSetting = (e) => {
    emits("opensetting", e);
  };
  const launchApp = (e) => {
    emits("launchapp", e);
  };
  const getUserInfo = (e) => {
    emits("getuserinfo", e);
  };
  const chooseAvatar = (e) => {
    emits("chooseavatar", e);
  };
  const agreePrivacyAuthorization = (e) => {
    emits("agreeprivacyauthorization", e);
  };
  const contact = (e) => {
    emits("contact", e);
  };
  const openTypeError = (e) => {
    emits("error", e);
  };
  return {
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
  };
};
exports.useButton = useButton;
