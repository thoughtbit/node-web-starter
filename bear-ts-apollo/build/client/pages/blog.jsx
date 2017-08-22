"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Layout_1 = require("../components/Layout");
class default_1 extends React.Component {
    static getInitialProps({ query: { id } }) {
        return { id };
    }
    render() {
        return (<Layout_1.default title='我的博客'>
        <h1>My {this.props.id} blog post</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Layout_1.default>);
    }
}
exports.default = default_1;
//# sourceMappingURL=blog.jsx.map