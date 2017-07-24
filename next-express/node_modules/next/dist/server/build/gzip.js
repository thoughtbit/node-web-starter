'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.gzip = gzip;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dir) {
    var nextDir, coreAssets, pages, allAssets, currentChunk;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nextDir = _path2.default.resolve(dir, '.next');
            coreAssets = [_path2.default.join(nextDir, 'commons.js'), _path2.default.join(nextDir, 'main.js')];
            _context.next = 4;
            return (0, _globPromise2.default)('bundles/pages/**/*.json', { cwd: nextDir });

          case 4:
            pages = _context.sent;
            allAssets = [].concat(coreAssets, (0, _toConsumableArray3.default)(pages.map(function (page) {
              return _path2.default.join(nextDir, page);
            })));

          case 6:
            if (!true) {
              _context.next = 14;
              break;
            }

            // gzip only 10 assets in parallel at a time.
            currentChunk = allAssets.splice(0, 10);

            if (!(currentChunk.length === 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('break', 14);

          case 10:
            _context.next = 12;
            return _promise2.default.all(currentChunk.map(gzip));

          case 12:
            _context.next = 6;
            break;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function gzipAssets(_x) {
    return _ref.apply(this, arguments);
  }

  return gzipAssets;
}();

function gzip(filePath) {
  var input = _fs2.default.createReadStream(filePath);
  var output = _fs2.default.createWriteStream(filePath + '.gz');

  return new _promise2.default(function (resolve, reject) {
    var stream = input.pipe(_zlib2.default.createGzip()).pipe(output);
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
}