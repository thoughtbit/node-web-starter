"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const head_1 = require("next/head");
const Header_1 = require("./Header");
const Layout = ({ children, title = 'This is the default title' }) => (<div>
    <head_1.default>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css'/>
    </head_1.default>
    <Header_1.default />
    {children}
    <footer>
      I`m here to stay
    </footer>
  </div>);
exports.default = Layout;
//# sourceMappingURL=Layout.jsx.map