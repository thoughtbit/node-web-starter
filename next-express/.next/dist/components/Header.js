'use strict';

var _style = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/styled-jsx/style.js');

var _style2 = _interopRequireDefault2(_style);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _react = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _link = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _index = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_index2.default.onRouteChangeStart = function (url) {
  console.log('Loading: ' + url);
  _nprogress2.default.start();
};
_index2.default.onRouteChangeComplete = function () {
  return _nprogress2.default.done();
};
_index2.default.onRouteChangeError = function () {
  return _nprogress2.default.done();
};

exports.default = function () {
  return _react2.default.createElement('header', {
    'data-jsx': 2631504124
  }, _react2.default.createElement('nav', { className: 'nav', 'data-jsx': 2631504124
  }, _react2.default.createElement(_link2.default, { href: '/' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'Home')), _react2.default.createElement(_link2.default, { href: '/blog' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'blog')), _react2.default.createElement(_link2.default, { href: '/blog?id=first', as: '/blog/first' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'My first blog post')), _react2.default.createElement(_link2.default, { href: '/contact' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'Contact')), _react2.default.createElement(_link2.default, { href: '/about' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'About')), _react2.default.createElement(_link2.default, { href: '/error' }, _react2.default.createElement('a', {
    'data-jsx': 2631504124
  }, 'Error'))), _react2.default.createElement(_style2.default, {
    styleId: 2631504124,
    css: '\n      .nav {\n        text-align: center;\n      }\n      .nav a {\n        display: inline-block;\n        padding: 5px;\n        border: 1px solid #eee;\n        margin: 0 5px;\n      }\n      .nav a:hover {\n        background: #ccc;\n      }\n    '
  }));
};