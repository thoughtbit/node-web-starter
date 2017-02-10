'use strict';

var _react = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/react/react.js');

var _react2 = _interopRequireDefault2(_react);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _link = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _head = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var children = _ref.children,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? 'This is the default title' : _ref$title;
  return _react2.default.createElement('div', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, title), _react2.default.createElement('meta', { charSet: 'utf-8' }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }), _react2.default.createElement('link', { rel: 'stylesheet', type: 'text/css', href: '/static/nprogress.css' })), _react2.default.createElement(_Header2.default, null), children, _react2.default.createElement('footer', null, 'I`m here to stay'));
};