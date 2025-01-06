"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Math) {
  TnPicker();
}
const TnPicker = () => "../../uni_modules/tuniaoui-vue3/components/picker/src/picker.js";
const _sfc_main = {
  __name: "interview",
  setup(__props) {
    let categoryName;
    let models = common_vendor.ref([]);
    let categoryItems = common_vendor.ref([]);
    let openModelsPicker = common_vendor.ref(false);
    let modelsPickerValue = common_vendor.ref("数值2");
    let modelsPickerData = ["数值1", "数值2", "数值3", "数值4", "数值5"];
    let openCategoryItemsPicker = common_vendor.ref(false);
    let categoryItemsPickerValue = common_vendor.ref("数值2");
    let categoryItemsPickerData = ["数值1", "数值2", "数值3", "数值4", "数值5"];
    common_vendor.onLoad((options) => {
      categoryName = options.categoryName;
      common_vendor.index.getStorage({
        key: "models",
        success: (res) => {
          models.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllModels().then((res) => {
            models.value = res;
            common_vendor.index.setStorage({
              key: "models",
              data: res
            });
          }).catch();
        }
      });
      common_vendor.index.getStorage({
        key: "category_" + categoryName,
        success: (res) => {
          categoryItems.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllCategoryItems(categoryName).then((res) => {
            categoryItems.value = res;
            common_vendor.index.setStorage({
              key: "category_" + categoryName,
              data: res
            });
          }).catch();
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(modelsPickerValue) ? modelsPickerValue.value = $event : modelsPickerValue = $event),
        b: common_vendor.o(($event) => common_vendor.isRef(openModelsPicker) ? openModelsPicker.value = $event : openModelsPicker = $event),
        c: common_vendor.p({
          data: common_vendor.unref(modelsPickerData),
          modelValue: common_vendor.unref(modelsPickerValue),
          open: common_vendor.unref(openModelsPicker)
        }),
        d: common_vendor.o(($event) => common_vendor.isRef(categoryItemsPickerValue) ? categoryItemsPickerValue.value = $event : categoryItemsPickerValue = $event),
        e: common_vendor.o(($event) => common_vendor.isRef(openCategoryItemsPicker) ? openCategoryItemsPicker.value = $event : openCategoryItemsPicker = $event),
        f: common_vendor.p({
          data: common_vendor.unref(categoryItemsPickerData),
          modelValue: common_vendor.unref(categoryItemsPickerValue),
          open: common_vendor.unref(openCategoryItemsPicker)
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
