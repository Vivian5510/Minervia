"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "interview",
  setup(__props) {
    let categoryName;
    let models = common_vendor.ref([]);
    let categoryItems = common_vendor.ref([]);
    let model = common_vendor.reactive({
      name: "请选择AI模型",
      charge: void 0
    });
    let categoryItem = common_vendor.reactive({
      text: "请选择试题分类",
      name: void 0
    });
    function modelSelect(event) {
      Object.assign(model, models.value[event.detail.value]);
    }
    function categoryItemSelect(event) {
      Object.assign(categoryItem, categoryItems.value[event.detail.value]);
    }
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
        a: common_vendor.t(common_vendor.unref(model).name),
        b: common_vendor.unref(models),
        c: common_vendor.o(modelSelect),
        d: common_vendor.t(common_vendor.unref(categoryItem).text),
        e: common_vendor.unref(categoryItems),
        f: common_vendor.o(categoryItemSelect)
      };
    };
  }
};
wx.createPage(_sfc_main);
