"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const head_1 = require("next/head");
const Header_1 = require("./Header");
const Layout = ({ children, title = 'This is the default title' }) => (React.createElement("div", null,
    React.createElement(head_1.default, null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: 'utf-8' }),
        React.createElement("meta", { name: 'viewport', content: 'initial-scale=1.0, width=device-width' }),
        React.createElement("link", { rel: 'stylesheet', type: 'text/css', href: '/static/nprogress.css' })),
    React.createElement(Header_1.default, null),
    children,
    React.createElement("footer", null, "I`m here to stay")));
exports.default = Layout;
//# sourceMappingURL=Layout.js.map