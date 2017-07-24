'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reloadIfPrefetched = exports.prefetch = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var prefetch = exports.prefetch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(href) {
    var url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (hasServiceWorkerSupport()) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            if ((0, _link.isLocal)(href)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return');

          case 4:

            // Register the service worker if it's not.
            messenger.ensureInitialized();

            url = getPrefetchUrl(href);

            if (!PREFETCHED_URLS[url]) {
              PREFETCHED_URLS[url] = messenger.send({ action: 'ADD_URL', url: url });
            }

            return _context.abrupt('return', PREFETCHED_URLS[url]);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function prefetch(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var reloadIfPrefetched = exports.reloadIfPrefetched = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(href) {
    var url;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = getPrefetchUrl(href);

            if (PREFETCHED_URLS[url]) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return');

          case 3:

            delete PREFETCHED_URLS[url];
            _context2.next = 6;
            return prefetch(href);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function reloadIfPrefetched(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messenger = function () {
  function Messenger() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Messenger);

    this.id = 0;
    this.callacks = {};
    this.serviceWorkerReadyCallbacks = [];
    this.serviceWorkerState = null;

    navigator.serviceWorker.addEventListener('message', function (_ref) {
      var data = _ref.data;

      if (data.action !== 'REPLY') return;
      if (_this.callacks[data.replyFor]) {
        _this.callacks[data.replyFor](data);
      }
    });

    // Reset the cache always.
    // Sometimes, there's an already running service worker with cached requests.
    // If the app doesn't use any prefetch calls, `ensureInitialized` won't get
    // called and cleanup resources.
    // So, that's why we do this.
    this._resetCache();
  }

  (0, _createClass3.default)(Messenger, [{
    key: 'send',
    value: function send(payload) {
      var _this2 = this;

      return new _promise2.default(function (resolve, reject) {
        if (_this2.serviceWorkerState === 'REGISTERED') {
          _this2._send(payload, handleCallback);
        } else {
          _this2.serviceWorkerReadyCallbacks.push(function () {
            _this2._send(payload, handleCallback);
          });
        }

        function handleCallback(err) {
          if (err) return reject(err);
          return resolve();
        }
      });
    }
  }, {
    key: '_send',
    value: function _send(payload) {
      var _this3 = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var id = this.id++;
      var newPayload = (0, _extends3.default)({}, payload, { id: id });

      this.callacks[id] = function (data) {
        if (data.error) {
          cb(data.error);
        } else {
          cb(null, data.result);
        }

        delete _this3.callacks[id];
      };

      navigator.serviceWorker.controller.postMessage(newPayload);
    }
  }, {
    key: '_resetCache',
    value: function _resetCache(cb) {
      var _this4 = this;

      var reset = function reset() {
        _this4._send({ action: 'RESET' }, cb);
      };

      if (navigator.serviceWorker.controller) {
        reset();
      } else {
        navigator.serviceWorker.oncontrollerchange = reset;
      }
    }
  }, {
    key: 'ensureInitialized',
    value: function ensureInitialized() {
      var _this5 = this;

      if (this.serviceWorkerState) {
        return;
      }

      this.serviceWorkerState = 'REGISTERING';
      navigator.serviceWorker.register('/_next-prefetcher.js');

      // Reset the cache after registered
      // We don't need to have any old caches since service workers lives beyond
      // life time of the webpage.
      // With this prefetching won't work 100% if multiple pages of the same app
      // loads in the same browser in same time.
      // Basically, cache will only have prefetched resourses for the last loaded
      // page of a given app.
      // We could mitigate this, when we add a hash to a every file we fetch.
      this._resetCache(function (err) {
        if (err) throw err;
        _this5.serviceWorkerState = 'REGISTERED';
        _this5.serviceWorkerReadyCallbacks.forEach(function (cb) {
          return cb();
        });
        _this5.serviceWorkerReadyCallbacks = [];
      });
    }
  }]);
  return Messenger;
}(); /* global __NEXT_DATA__ */

function hasServiceWorkerSupport() {
  return typeof navigator !== 'undefined' && navigator.serviceWorker;
}

var PREFETCHED_URLS = {};
var messenger = void 0;

if (hasServiceWorkerSupport()) {
  messenger = new Messenger();
}

function getPrefetchUrl(href) {
  var _urlParse = (0, _url.parse)(href),
      pathname = _urlParse.pathname;

  var url = '/_next/' + __NEXT_DATA__.buildId + '/pages' + pathname;

  return url;
}

var LinkPrefetch = function (_React$Component) {
  (0, _inherits3.default)(LinkPrefetch, _React$Component);

  function LinkPrefetch() {
    (0, _classCallCheck3.default)(this, LinkPrefetch);
    return (0, _possibleConstructorReturn3.default)(this, (LinkPrefetch.__proto__ || (0, _getPrototypeOf2.default)(LinkPrefetch)).apply(this, arguments));
  }

  (0, _createClass3.default)(LinkPrefetch, [{
    key: 'render',
    value: function render() {
      var href = this.props.href;

      if (this.props.prefetch !== false) {
        prefetch(href);
      }

      return _react2.default.createElement(_link2.default, this.props);
    }
  }]);
  return LinkPrefetch;
}(_react2.default.Component);

exports.default = LinkPrefetch;