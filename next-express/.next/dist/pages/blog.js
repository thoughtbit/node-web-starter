'use strict';

var _react2 = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/react/react.js');

var _react3 = _interopRequireDefault2(_react2);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/moocss/work/WebProjects/node-web-starter/next-express/node_modules/react/react.js');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _class = function (_Component) {
  (0, _inherits3.default)(_class, _Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(_Layout2.default, { title: '\u6211\u7684\u535A\u5BA2' }, _react3.default.createElement('h1', null, 'My ', this.props.id, ' blog post'), _react3.default.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'));
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var id = _ref.query.id;

      return { id: id };
    }
  }]);
  return _class;
}(_react.Component);

exports.default = _class;