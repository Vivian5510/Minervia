"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tool = require("../../utils/tool.js");
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
      name: "请选择考官模型",
      charge: void 0
    });
    let categoryItem = common_vendor.reactive({
      text: "请选择试题分类",
      name: void 0
    });
    let btnSwitch = common_vendor.reactive({
      text: "开 始 面 试",
      disabled: false,
      show: true
    });
    let content = common_vendor.reactive({
      text: "",
      show: false
    });
    function answerQuestion(answer) {
      ({
        sessionId: utils_tool.getSessionId(false),
        subject: categoryName,
        content: answer,
        type: "a",
        modelName: model.name
      });
      common_vendor.index.showLoading({
        title: "面试官正在思考"
      });
      btnSwitch.show = !btnSwitch.show;
      content.show = true;
      content.text = "您的选择是：B（索引可以提高数据的写入速度）。答案是不正确的。\n\n 详细解析：\n A.索引可以加快数据的检索速度。\n 正确。 索引通过快速定位数据， 减少查询扫描行数， 从而加快检索速度。\n\n B.索引可以提高数据的写入速度。 n不正确。 索引的维护会增加额外开销， 特别是在插入、 更新、 删除时， 数据库需要同步更新索引信息， 降低了写入效率。\n\n C.索引的创建会增加数据库的存储空间消耗。\n 正确。 索引的创建需要额外存储空间， 用于存储索引结构和元数据。\n\n D.在进行表连接操作时， 索引不会提高查询效率。\n 不正确。 索引在表连接操作中非常重要， 能显著提高连接效率， 减少全表扫描。\n\n 结论： 您选择的 B 是正确答案， 因为它是题目中关于索引描述的错误项。 ";
      btnSwitch.disabled = !btnSwitch.disabled;
      common_vendor.index.hideLoading();
    }
    function startInterview() {
      if (model.name == "请选择AI模型") {
        common_vendor.index.showToast({
          image: "../../static/icon/angel.svg",
          title: "请选择AI模型",
          duration: 1e3
        });
        return;
      } else if (categoryItem.text == "请选择试题分类") {
        common_vendor.index.showToast({
          image: "../../static/icon/angel.svg",
          title: "请选择试题分类",
          duration: 1e3
        });
        return;
      }
      ({
        sessionId: utils_tool.getSessionId(true),
        subject: categoryName,
        content: categoryItem.name,
        type: "q",
        modelName: model.name
      });
      common_vendor.index.showLoading({
        title: "面试官正在思考"
      });
      btnSwitch.disabled = !btnSwitch.disabled;
      btnSwitch.show = !btnSwitch.show;
      btnSwitch.text = "再 来 一 题";
      content.show = true;
      content.text = "在MySQL中，关于索引的描述，以下哪项是不正确的？\n\rA. 索引可以加快数据的检索速度。\n\rB. 索引可以提高数据的写入速度。\n\rC. 索引的创建会增加数据库的存储空间消耗。\n\rD. 在进行表连接操作时，索引不会提高查询效率。";
      common_vendor.index.hideLoading();
    }
    function refresh() {
      btnSwitch.disabled = false;
      btnSwitch.show = true;
      btnSwitch.text = "开 始 面 试";
      content.show = false;
      content.text = "";
    }
    function modelSelect(event) {
      refresh();
      Object.assign(model, models.value[event.detail.value]);
    }
    function categoryItemSelect(event) {
      refresh();
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
        g: common_vendor.t(common_vendor.unref(content).text),
        h: common_vendor.unref(content).show,
        i: common_vendor.p({
          title: "Minervia",
          extra: `${common_vendor.unref(categoryItem).text}面试题`
        }),
        j: common_vendor.t(common_vendor.unref(btnSwitch).text),
        k: common_vendor.o(startInterview),
        l: common_vendor.p({
          width: "650rpx",
          height: "80rpx",
          ["bg-color"]: "#3d3d3d",
          disabled: common_vendor.unref(btnSwitch).disabled
        }),
        m: common_vendor.unref(btnSwitch).show,
        n: common_vendor.o(($event) => answerQuestion("A")),
        o: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "75%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        p: common_vendor.o(($event) => answerQuestion("B")),
        q: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "54%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        r: common_vendor.o(($event) => answerQuestion("C")),
        s: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "33%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        t: common_vendor.o(($event) => answerQuestion("D")),
        v: common_vendor.p({
          size: "lg",
          ["bg-color"]: "#3d3d3d",
          right: "12%",
          top: "90%",
          disabled: !common_vendor.unref(btnSwitch).disabled
        }),
        w: !common_vendor.unref(btnSwitch).show
      };
    };
  }
};
wx.createPage(_sfc_main);
