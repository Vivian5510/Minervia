"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_tuniaouiVue3_constants_event = require("../../../../constants/event.js");
const uni_modules_tuniaouiVue3_utils_isEmpty = require("../../../../utils/is-empty.js");
require("../../../../libs/lodash/_baseToString.js");
const uni_modules_tuniaouiVue3_utils_error = require("../../../../utils/error.js");
const uni_modules_tuniaouiVue3_utils_cloneDeep = require("../../../../utils/clone-deep.js");
const usePicker = (props) => {
  const { emit } = common_vendor.getCurrentInstance();
  const openPopup = common_vendor.ref(false);
  const showPicker = common_vendor.ref(true);
  common_vendor.watch(
    () => props.open,
    (value) => {
      openPopup.value = value;
    }
  );
  const _closePopup = () => {
    emit("update:open", false);
  };
  const closePopupEvent = () => {
    _closePopup();
    _generatePickerViewData(props.modelValue);
    emit("close");
  };
  let pickerMode = "signle";
  const _generateData = (data) => {
    if (common_vendor.isObject(data)) {
      const originalData = uni_modules_tuniaouiVue3_utils_cloneDeep.cloneDeep(data);
      if (Object.prototype.hasOwnProperty.call(originalData, props.childrenKey)) {
        delete originalData[props.childrenKey];
      }
      return {
        label: data[props.labelKey],
        value: data[props.valueKey],
        originalData
      };
    } else {
      return {
        label: data,
        value: data,
        originalData: data
      };
    }
  };
  const _generateOrUpdateCascadeData = (data, generateIndex = 1, defaultValue = []) => {
    if (pickerData.value.length < generateIndex) {
      pickerData.value.push(
        ...Array.from(
          { length: generateIndex - pickerData.value.length },
          () => []
        )
      );
    }
    pickerData.value[generateIndex - 1] = [
      ...data.map((item) => _generateData(item))
    ];
    let childrenIndex = 0;
    if (defaultValue.length) {
      childrenIndex = pickerData.value[generateIndex - 1].findIndex(
        (item) => item.value === defaultValue[generateIndex - 1]
      );
      childrenIndex = ~childrenIndex ? childrenIndex : 0;
    }
    if (data[childrenIndex] && Object.prototype.hasOwnProperty.call(
      data[childrenIndex],
      props.childrenKey
    )) {
      _generateOrUpdateCascadeData(
        data[childrenIndex][props.childrenKey],
        generateIndex + 1,
        defaultValue
      );
    }
  };
  const pickerData = common_vendor.ref([]);
  const currentPickerIndex = common_vendor.ref([]);
  const initDefaultPickerIndex = () => {
    let indexValue = [];
    if (props.modelValue === void 0 || !props.modelValue && ["multiple", "cascade"].includes(pickerMode) || common_vendor.isArray(props.modelValue) && !props.modelValue.length) {
      indexValue = Array.from({ length: pickerData.value.length }, () => 0);
    } else {
      if (common_vendor.isArray(props.modelValue)) {
        indexValue = pickerData.value.map((item, index) => {
          let pickerIndex = 0;
          if (!props.modelValue[index])
            pickerIndex = 0;
          else {
            pickerIndex = item.findIndex((childItem) => {
              return childItem.value === props.modelValue[index];
            });
          }
          return ~pickerIndex ? pickerIndex : 0;
        });
      } else {
        indexValue = pickerData.value.map((_, k) => {
          const index = pickerData.value[k].findIndex(
            (item) => item.value === props.modelValue
          );
          return index === -1 ? 0 : index;
        });
      }
    }
    currentPickerIndex.value = indexValue;
  };
  const splitUserPickerData = () => {
    const { data } = props;
    if (!data)
      return;
    if (!common_vendor.isArray(data)) {
      uni_modules_tuniaouiVue3_utils_error.throwError("TnPicker", "picker选择器数据不正确，请传递数组格式的数据");
    }
    if (data.length === 0)
      return;
    if (common_vendor.isArray(data[0])) {
      pickerMode = "multiple";
      pickerData.value = data.reduce(
        (prev, cur) => {
          prev.push(cur.map((item) => _generateData(item)));
          return prev;
        },
        []
      );
    } else if (!common_vendor.isArray(data[0]) && common_vendor.isObject(data[0]) && Object.prototype.hasOwnProperty.call(data[0], props.childrenKey)) {
      pickerMode = "cascade";
      _generateOrUpdateCascadeData(
        data,
        1,
        props.modelValue
      );
    } else {
      pickerMode = "signle";
      pickerData.value = [data.map((item) => _generateData(item))];
    }
    common_vendor.nextTick$1(() => {
      initDefaultPickerIndex();
    });
  };
  common_vendor.watch(
    () => props.data,
    () => {
      splitUserPickerData();
    },
    {
      immediate: true
    }
  );
  const _getCurrentPickerValue = () => {
    if (pickerMode === "signle" && !common_vendor.isArray(props.data[0])) {
      return pickerData.value[0][currentPickerIndex.value[0]].value;
    } else {
      const pickerIndex = uni_modules_tuniaouiVue3_utils_cloneDeep.cloneDeep(currentPickerIndex.value);
      pickerIndex.splice(pickerData.value.length);
      return pickerIndex.map(
        (item, index) => {
          var _a;
          return uni_modules_tuniaouiVue3_utils_isEmpty.isEmptyVariableInDefault((_a = pickerData.value[index][item]) == null ? void 0 : _a.value, 0);
        }
      );
    }
  };
  const _getCurrentPickerOriginData = () => {
    if (pickerMode === "signle" && !common_vendor.isArray(props.data[0])) {
      return pickerData.value[0][currentPickerIndex.value[0]].originalData;
    } else {
      const pickerIndex = uni_modules_tuniaouiVue3_utils_cloneDeep.cloneDeep(currentPickerIndex.value);
      pickerIndex.splice(pickerData.value.length);
      return pickerIndex.map(
        (item, index) => {
          var _a;
          return uni_modules_tuniaouiVue3_utils_isEmpty.isEmptyVariableInDefault(
            (_a = pickerData.value[index][item]) == null ? void 0 : _a.originalData,
            void 0
          );
        }
      );
    }
  };
  const _generatePickerViewData = (val) => {
    if (pickerMode === "cascade") {
      _generateOrUpdateCascadeData(
        props.data,
        1,
        val
      );
    }
    common_vendor.nextTick$1(() => {
      initDefaultPickerIndex();
    });
  };
  let isInnerUpdate = false;
  common_vendor.watch(
    () => props.modelValue,
    (val) => {
      if (isInnerUpdate) {
        isInnerUpdate = false;
        return;
      }
      _generatePickerViewData(val);
    },
    {
      deep: true
    }
  );
  let changeTimer = null;
  let continuousChangeStatus = false;
  const pickerViewChangeEvent = (e) => {
    if (continuousChangeStatus) {
      return;
    }
    changeTimer = setTimeout(() => {
      continuousChangeStatus = false;
      changeTimer && clearTimeout(changeTimer);
      changeTimer = null;
    }, 300);
    continuousChangeStatus = true;
    let changePickerColumnIndex = currentPickerIndex.value.findIndex(
      (item, index) => item !== e.detail.value[index]
    );
    changePickerColumnIndex = ~changePickerColumnIndex ? changePickerColumnIndex : 0;
    currentPickerIndex.value = e.detail.value;
    if (pickerMode === "cascade") {
      let data = props.data;
      for (let i = 0; i < changePickerColumnIndex; i++) {
        data = data[currentPickerIndex.value[i]][props.childrenKey];
      }
      const pickerIndex = currentPickerIndex.value[changePickerColumnIndex];
      pickerData.value.splice(changePickerColumnIndex + 1);
      if (data[pickerIndex] && Object.prototype.hasOwnProperty.call(
        data[pickerIndex],
        props.childrenKey
      )) {
        _generateOrUpdateCascadeData(
          data[pickerIndex][props.childrenKey],
          changePickerColumnIndex + 2
        );
        currentPickerIndex.value = pickerData.value.map((item, index) => {
          return index <= changePickerColumnIndex ? currentPickerIndex.value[index] : 0;
        });
      }
    }
    isInnerUpdate = true;
    const value = _getCurrentPickerValue();
    const originData = _getCurrentPickerOriginData();
    emit(uni_modules_tuniaouiVue3_constants_event.CHANGE_EVENT, value, changePickerColumnIndex, originData);
  };
  const resetPickerIndexWithPosition = (start, end) => {
    currentPickerIndex.value = currentPickerIndex.value.map((item, index) => {
      return index >= start && (!end || index <= end) ? 0 : item;
    });
  };
  const confirmEvent = () => {
    const value = _getCurrentPickerValue();
    const originData = _getCurrentPickerOriginData();
    isInnerUpdate = true;
    emit(uni_modules_tuniaouiVue3_constants_event.UPDATE_MODEL_EVENT, value);
    common_vendor.nextTick$1(() => {
      emit("confirm", value, originData);
    });
    _closePopup();
  };
  const cancelEvent = () => {
    _generatePickerViewData(props.modelValue);
    emit("cancel");
    _closePopup();
  };
  return {
    openPopup,
    showPicker,
    pickerData,
    currentPickerIndex,
    closePopupEvent,
    pickerViewChangeEvent,
    confirmEvent,
    cancelEvent,
    initDefaultPickerIndex,
    resetPickerIndexWithPosition
  };
};
exports.usePicker = usePicker;
