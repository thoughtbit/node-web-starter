"use strict";

var _react = require("/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/react/react.js");

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _Layout = require("../components/Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function () {
  return _react2.default.createElement(_Layout2.default, { title: "\u8054\u7CFB\u6211\u4EEC" }, _react2.default.createElement("p", null, "Contact Page!"));
};