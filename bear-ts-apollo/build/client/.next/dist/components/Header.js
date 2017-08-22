"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var link_1 = require("next/dist/lib/link.js");
var nprogress_1 = require("nprogress");
var router_1 = require("next/dist/lib/router/index.js");
router_1.default.onRouteChangeStart = function (url) {
    console.log("Loading: " + url);
    nprogress_1.default.start();
};
router_1.default.onRouteChangeComplete = function () {
    return nprogress_1.default.done();
};
router_1.default.onRouteChangeError = function () {
    return nprogress_1.default.done();
};
var Header = function Header() {
    return React.createElement("header", null, React.createElement("nav", { className: 'nav' }, React.createElement(link_1.default, { href: '/' }, React.createElement("a", null, "Home")), React.createElement(link_1.default, { href: '/blog' }, React.createElement("a", null, "blog")), React.createElement(link_1.default, { href: '/blog?id=first', as: '/blog/first' }, React.createElement("a", null, "My first blog post")), React.createElement(link_1.default, { href: '/contact' }, React.createElement("a", null, "Contact")), React.createElement(link_1.default, { href: '/about' }, React.createElement("a", null, "About")), React.createElement(link_1.default, { href: '/error' }, React.createElement("a", null, "Error"))), React.createElement("style", { jsx: true, global: true }, "\n      .nav {\n        text-align: center;\n      }\n      .nav a {\n        display: inline-block;\n        padding: 5px;\n        border: 1px solid #eee;\n        margin: 0 5px;\n      }\n      .nav a:hover {\n        background: #ccc;\n      }\n    "));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map