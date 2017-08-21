"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const Layout_1 = require("../components/Layout");
class default_1 extends React.Component {
    // Add some delay
    static getInitialProps() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
            return {};
        });
    }
    render() {
        return (React.createElement(Layout_1.default, { title: '关于我们' },
            React.createElement("p", null, "About us Page!")));
    }
}
exports.default = default_1;
//# sourceMappingURL=about.js.map