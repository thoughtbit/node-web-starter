"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Layout_1 = require("../components/Layout");
exports.default = function () {
    return React.createElement(Layout_1.default, { title: '错误' }, React.createElement("p", null, "This should not be rendered via SSR"));
};
//# sourceMappingURL=error.js.map