'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoDB = function () {
  function MongoDB() {
    _classCallCheck(this, MongoDB);
  }

  _createClass(MongoDB, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var uri, promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uri = 'mongodb+srv://admin:admin12345@project1-jhxit.gcp.mongodb.net/line?retryWrites=true&w=majority';
                promise = new Promise(function (resolve, reject) {
                  _mongodb.MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, connection) {
                    if (err) reject(err);
                    resolve(connection);
                  });
                });
                return _context.abrupt('return', promise);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }]);

  return MongoDB;
}();

var mongodb = exports.mongodb = new MongoDB();
exports.default = mongodb;