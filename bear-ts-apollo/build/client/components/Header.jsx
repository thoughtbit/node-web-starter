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
const Header = () => (<header>
    <nav className='nav'>
      <link_1.default href='/'><a>Home</a></link_1.default>
      <link_1.default href='/blog'><a>blog</a></link_1.default>
      <link_1.default href='/blog?id=first' as='/blog/first'><a>My first blog post</a></link_1.default>
      <link_1.default href='/contact'><a>Contact</a></link_1.default>
      <link_1.default href='/about'><a>About</a></link_1.default>
      <link_1.default href='/error'><a>Error</a></link_1.default>
    </nav>
    <style jsx global>{`
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
    `}</style>
  </header>);
exports.default = Header;
//# sourceMappingURL=Header.jsx.map