"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const link_1 = require("next/link");
const nprogress_1 = require("nprogress");
const router_1 = require("next/router");
router_1.default.onRouteChangeStart = (url) => {
    console.log(`Loading: ${url}`);
    nprogress_1.default.start();
};
router_1.default.onRouteChangeComplete = () => nprogress_1.default.done();
router_1.default.onRouteChangeError = () => nprogress_1.default.done();
const Header = () => (React.createElement("header", null,
    React.createElement("nav", { className: 'nav' },
        React.createElement(link_1.default, { href: '/' },
            React.createElement("a", null, "Home")),
        React.createElement(link_1.default, { href: '/blog' },
            React.createElement("a", null, "blog")),
        React.createElement(link_1.default, { href: '/blog?id=first', as: '/blog/first' },
            React.createElement("a", null, "My first blog post")),
        React.createElement(link_1.default, { href: '/contact' },
            React.createElement("a", null, "Contact")),
        React.createElement(link_1.default, { href: '/about' },
            React.createElement("a", null, "About")),
        React.createElement(link_1.default, { href: '/error' },
            React.createElement("a", null, "Error"))),
    React.createElement("style", { jsx: true, global: true }, `
      .nav {
        text-align: center;
      }
      .nav a {
        display: inline-block;
        padding: 5px;
        border: 1px solid #eee;
        margin: 0 5px;
      }
      .nav a:hover {
        background: #ccc;
      }
    `)));
exports.default = Header;
//# sourceMappingURL=Header.js.map