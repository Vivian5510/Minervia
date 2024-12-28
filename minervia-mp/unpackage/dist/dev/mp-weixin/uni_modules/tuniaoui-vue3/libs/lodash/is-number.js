"use strict";
const uni_modules_tuniaouiVue3_libs_lodash_isObjectLike = require("./is-object-like.js");
const uni_modules_tuniaouiVue3_libs_lodash__objectToString = require("./_objectToString.js");
const numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || uni_modules_tuniaouiVue3_libs_lodash_isObjectLike.isObjectLike(value) && uni_modules_tuniaouiVue3_libs_lodash__objectToString.objectToString.call(value) == numberTag;
}
exports.isNumber = isNumber;
