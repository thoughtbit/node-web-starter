"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var head_1 = require("next/dist/lib/head.js");
var Header_1 = require("./Header");
var Layout = function Layout(_ref) {
    var children = _ref.children,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'This is the default title' : _ref$title;
    return React.createElement("div", null, React.createElement(head_1.default, null, React.createElement("title", null, title), React.createElement("meta", { charSet: 'utf-8' }), React.createElement("meta", { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }), React.createElement("link", { rel: 'stylesheet', type: 'text/css', href: '/static/nprogress.css' })), React.createElement(Header_1.default, null), children, React.createElement("footer", null, "I`m here to stay"));
};
exports.default = Layout;
//# sourceMappingURL=Layout.js.map