"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Layout_1 = require("../components/Layout");
class default_1 extends React.Component {
    static getInitialProps({ query: { id } }) {
        return { id };
    }
    render() {
        return (React.createElement(Layout_1.default, { title: '我的博客' },
            React.createElement("h1", null,
                "My ",
                this.props.id,
                " blog post"),
            React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")));
    }
}
exports.default = default_1;
//# sourceMappingURL=blog.js.map