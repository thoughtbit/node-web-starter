"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Layout_1 = require("../components/Layout");

var default_1 = function (_React$Component) {
    (0, _inherits3.default)(default_1, _React$Component);

    function default_1() {
        (0, _classCallCheck3.default)(this, default_1);

        return (0, _possibleConstructorReturn3.default)(this, (default_1.__proto__ || (0, _getPrototypeOf2.default)(default_1)).apply(this, arguments));
    }

    (0, _createClass3.default)(default_1, [{
        key: "render",
        value: function render() {
            return React.createElement(Layout_1.default, { title: '我的博客' }, React.createElement("h1", null, "My ", this.props.id, " blog post"), React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."));
        }
    }], [{
        key: "getInitialProps",
        value: function getInitialProps(_ref) {
            var id = _ref.query.id;

            return { id: id };
        }
    }]);

    return default_1;
}(React.Component);

exports.default = default_1;
//# sourceMappingURL=blog.js.map