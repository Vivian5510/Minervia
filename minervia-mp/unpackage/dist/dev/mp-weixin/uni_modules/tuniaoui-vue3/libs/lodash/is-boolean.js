"use strict";
const uni_modules_tuniaouiVue3_libs_lodash_isObjectLike = require("./is-object-like.js");
const uni_modules_tuniaouiVue3_libs_lodash__objectToString = require("./_objectToString.js");
const boolTag = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || uni_modules_tuniaouiVue3_libs_lodash_isObjectLike.isObjectLike(value) && uni_modules_tuniaouiVue3_libs_lodash__objectToString.objectToString.call(value) == boolTag;
}
exports.isBoolean = isBoolean;
