"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_constants_event = require("../../../../constants/event.js");
const usePopup = (props) => {
  const { emit } = common_vendor.getCurrentInstance();
  const iosDevice = common_vendor.computed(() => {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    return systemInfo.osName === "ios" || systemInfo.osName === "macos";
  });
  const showOverlay = common_vendor.ref(false);
  const showPopup = common_vendor.ref(false);
  const visiblePopup = common_vendor.ref(false);
  let initPopupModelValue = false;
  common_vendor.watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        visiblePopup.value = true;
        if (iosDevice.value) {
          setTimeout(() => {
            showPopup.value = true;
            if (props.overlay)
              showOverlay.value = true;
            initPopupModelValue && emit("open");
          }, 0);
        } else {
          showPopup.value = true;
          if (props.overlay)
            showOverlay.value = true;
          initPopupModelValue && emit("open");
        }
      } else {
        showPopup.value = false;
        showOverlay.value = false;
        setTimeout(() => {
          visiblePopup.value = false;
        }, 250);
        initPopupModelValue && emit("close");
      }
      initPopupModelValue = true;
    },
    {
      immediate: true
    }
  );
  const updateModelValue = (value) => {
    emit(uni_modules_tuniaouiVue3_constants_event.UPDATE_MODEL_EVENT, value);
  };
  const onClickCloseBtn = () => {
    updateModelValue(false);
    emit("close");
  };
  const onClickOverlay = () => {
    if (props.overlayCloseable) {
      updateModelValue(false);
      emit("close");
      emit("overlay-click");
    }
  };
  return {
    iosDevice,
    showOverlay,
    showPopup,
    visiblePopup,
    updateModelValue,
    onClickCloseBtn,
    onClickOverlay
  };
};
exports.usePopup = usePopup;
