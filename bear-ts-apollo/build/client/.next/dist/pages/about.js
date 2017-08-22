"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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
var tslib_1 = require("tslib");
var React = require("react");
var Layout_1 = require("../components/Layout");

var default_1 = function (_React$PureComponent) {
    (0, _inherits3.default)(default_1, _React$PureComponent);

    function default_1() {
        (0, _classCallCheck3.default)(this, default_1);

        return (0, _possibleConstructorReturn3.default)(this, (default_1.__proto__ || (0, _getPrototypeOf2.default)(default_1)).apply(this, arguments));
    }

    (0, _createClass3.default)(default_1, [{
        key: "render",
        value: function render() {
            return React.createElement(Layout_1.default, { title: '关于我们' }, React.createElement("p", null, "About us Page!"));
        }
    }], [{
        key: "getInitialProps",

        // Add some delay
        value: function getInitialProps() {
            return tslib_1.__awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return new _promise2.default(function (resolve) {
                                    setTimeout(resolve, 500);
                                });

                            case 2:
                                return _context.abrupt("return", {});

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return default_1;
}(React.PureComponent);

exports.default = default_1;
//# sourceMappingURL=about.js.map