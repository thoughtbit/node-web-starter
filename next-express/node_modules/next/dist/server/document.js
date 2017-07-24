'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextScript = exports.Main = exports.Head = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _htmlescape = require('htmlescape');

var _htmlescape2 = _interopRequireDefault(_htmlescape);

var _server = require('glamor/server');

var _server2 = require('styled-jsx/server');

var _server3 = _interopRequireDefault(_server2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_Component) {
  (0, _inherits3.default)(Document, _Component);
  (0, _createClass3.default)(Document, null, [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var head = void 0;
      var rendered = void 0;
      var styles = void 0;
      try {
        rendered = (0, _server.renderStatic)(function () {
          var page = renderPage();
          head = page.head;
          return page.html;
        });
      } finally {
        styles = (0, _server3.default)();
      }
      var _rendered = rendered,
          html = _rendered.html,
          css = _rendered.css,
          ids = _rendered.ids;

      var nextCSS = { css: css, ids: ids, styles: styles };
      return { html: html, head: head, nextCSS: nextCSS };
    }
  }]);

  function Document(props) {
    (0, _classCallCheck3.default)(this, Document);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).call(this, props));

    var __NEXT_DATA__ = props.__NEXT_DATA__,
        nextCSS = props.nextCSS;

    if (nextCSS) __NEXT_DATA__.ids = nextCSS.ids;
    return _this;
  }

  (0, _createClass3.default)(Document, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { _documentProps: this.props };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'html',
        null,
        _react2.default.createElement(Head, null),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement(Main, null),
          _react2.default.createElement(NextScript, null)
        )
      );
    }
  }]);
  return Document;
}(_react.Component);

Document.childContextTypes = {
  _documentProps: _react.PropTypes.any
};
exports.default = Document;

var Head = exports.Head = function (_Component2) {
  (0, _inherits3.default)(Head, _Component2);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);
    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'render',
    value: function render() {
      var _context$_documentPro = this.context._documentProps,
          head = _context$_documentPro.head,
          nextCSS = _context$_documentPro.nextCSS;

      return _react2.default.createElement(
        'head',
        null,
        (head || []).map(function (h, i) {
          return _react2.default.cloneElement(h, { key: i });
        }),
        nextCSS && nextCSS.css ? _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: nextCSS.css } }) : null,
        nextCSS && nextCSS.styles ? nextCSS.styles : null,
        this.props.children
      );
    }
  }]);
  return Head;
}(_react.Component);

Head.contextTypes = {
  _documentProps: _react.PropTypes.any
};

var Main = exports.Main = function (_Component3) {
  (0, _inherits3.default)(Main, _Component3);

  function Main() {
    (0, _classCallCheck3.default)(this, Main);
    return (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).apply(this, arguments));
  }

  (0, _createClass3.default)(Main, [{
    key: 'render',
    value: function render() {
      var html = this.context._documentProps.html;

      return _react2.default.createElement('div', { id: '__next', dangerouslySetInnerHTML: { __html: html } });
    }
  }]);
  return Main;
}(_react.Component);

Main.contextTypes = {
  _documentProps: _react.PropTypes.any
};

var NextScript = exports.NextScript = function (_Component4) {
  (0, _inherits3.default)(NextScript, _Component4);

  function NextScript() {
    (0, _classCallCheck3.default)(this, NextScript);
    return (0, _possibleConstructorReturn3.default)(this, (NextScript.__proto__ || (0, _getPrototypeOf2.default)(NextScript)).apply(this, arguments));
  }

  (0, _createClass3.default)(NextScript, [{
    key: 'render',
    value: function render() {
      var _context$_documentPro2 = this.context._documentProps,
          staticMarkup = _context$_documentPro2.staticMarkup,
          __NEXT_DATA__ = _context$_documentPro2.__NEXT_DATA__;
      var buildId = __NEXT_DATA__.buildId;


      return _react2.default.createElement(
        'div',
        null,
        staticMarkup ? null : _react2.default.createElement('script', { dangerouslySetInnerHTML: {
            __html: '__NEXT_DATA__ = ' + (0, _htmlescape2.default)(__NEXT_DATA__) + '; module={};'
          } }),
        staticMarkup ? null : _react2.default.createElement('script', { type: 'text/javascript', src: '/_next/' + buildId + '/commons.js' }),
        staticMarkup ? null : _react2.default.createElement('script', { type: 'text/javascript', src: '/_next/' + buildId + '/main.js' })
      );
    }
  }]);
  return NextScript;
}(_react.Component);

NextScript.contextTypes = {
  _documentProps: _react.PropTypes.any
};