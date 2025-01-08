"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_api = require("../../utils/api.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_card + TnButton + TnSuspendButton)();
}
const TnSuspendButton = () => "../../node-modules/tnuiv3p-tn-suspend-button/index.js";
const TnButton = () => "../../uni_modules/tuniaoui-vue3/components/button/src/button.js";
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
    let btnSwitch = common_vendor.ref({
      text: "开 始 面 试",
      disabled: false,
      show: false
    });
    let content = common_vendor.ref("");
    let showContent = common_vendor.ref(true);
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
        f: common_vendor.o(categoryItemSelect),
        g: common_vendor.t(common_vendor.unref(content)),
        h: common_vendor.p({
          ["v-show"]: common_vendor.unref(showContent),
          title: "Minervia",
          extra: `${common_vendor.unref(categoryItem).text}面试题`
        }),
        i: common_vendor.t(common_vendor.unref(btnSwitch).text),
        j: common_vendor.p({
          width: "650rpx",
          height: "80rpx",
          ["bg-color"]: "#3d3d3d",
          disabled: common_vendor.unref(btnSwitch).disabled
        }),
        k: common_vendor.unref(btnSwitch).show,
        l: common_assets._imports_0$1,
        m: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "75%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        n: common_assets._imports_1$1,
        o: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "54%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        p: common_assets._imports_2,
        q: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "33%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        r: common_assets._imports_3,
        s: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "12%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        t: !common_vendor.unref(btnSwitch).show
      };
    };
  }
};
wx.createPage(_sfc_main);
