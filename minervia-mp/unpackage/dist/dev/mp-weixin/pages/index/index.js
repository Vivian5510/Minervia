"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (TnSwiper + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const TnSwiper = () => "../../uni_modules/tuniaoui-vue3/components/swiper/src/swiper.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let currentSwiperIndex = common_vendor.ref(0);
    let banners = common_vendor.ref([]);
    let categories = common_vendor.ref([]);
    function bannerClick(url) {
      console.log(url);
      common_vendor.index.setStorage({
        key: "wvUrl",
        data: url,
        success: () => {
          console.log(url);
          common_vendor.index.navigateTo({
            url: "/pages/webview/webview"
          });
        }
      });
    }
    function gridItemClick(event) {
      let category = categories.value[event.detail.index];
      if (category.enable) {
        common_vendor.index.navigateTo({
          url: "/pages/interview/interview?categoryName=" + category.name
        });
      } else {
        common_vendor.index.showToast({
          duration: 2e3,
          title: "快马加鞭开发中",
          icon: "none"
        });
      }
    }
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "banners",
        success: (res) => {
          banners.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllBanners().then((res) => {
            banners.value = res;
            common_vendor.index.setStorage({
              key: "banners",
              data: res
            });
          }).catch();
        }
      });
      common_vendor.index.getStorage({
        key: "categories",
        success: (res) => {
          categories.value = res.data;
        },
        fail: (err) => {
          common_vendor.index.showLoading({
            title: "数据加载中"
          });
          utils_api.getAllCategories().then((res) => {
            categories.value = res;
            common_vendor.index.setStorage({
              key: "categories",
              data: res
            });
          }).catch();
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          data,
          active
        }, s0, i0) => {
          return {
            a: data.image,
            b: common_vendor.o(($event) => bannerClick(data.url)),
            c: common_vendor.n({
              active
            }),
            d: i0,
            e: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "1cf27b2a-0"
        }),
        b: common_vendor.o(($event) => common_vendor.isRef(currentSwiperIndex) ? currentSwiperIndex.value = $event : currentSwiperIndex = $event),
        c: common_vendor.p({
          data: common_vendor.unref(banners),
          width: "100%",
          height: "420",
          autoplay: true,
          loop: true,
          indicator: true,
          ["indicator-type"]: "dot",
          modelValue: common_vendor.unref(currentSwiperIndex)
        }),
        d: common_vendor.f(common_vendor.unref(categories), (category, index, i0) => {
          return {
            a: category.src,
            b: common_vendor.t(category.text),
            c: index,
            d: "1cf27b2a-2-" + i0 + ",1cf27b2a-1",
            e: common_vendor.p({
              index
            })
          };
        }),
        e: common_vendor.o(gridItemClick),
        f: common_vendor.p({
          column: 3,
          showBorder: false,
          square: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
