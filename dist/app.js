'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _mongodb = require('./mongodb');

var _di = require('./di');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _product = require('./routers/product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 9002;

_http2.default.createServer(app).listen(PORT, function () {
  console.log("server status : running");
  console.log('run on port : ' + PORT);
});

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var connection, db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongodb.mongodb.connect();

          case 2:
            connection = _context.sent;
            db = connection.db('line');

            _di.di.set('db', db);

            app.use(_bodyParser2.default.json({ limit: '280mb' }));
            app.use(_bodyParser2.default.urlencoded({ extended: true }));
            app.use(function (req, res, next) {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.header("Access-Control-Allow-Methods", "*");
              next();
            });

            // test --> http://localhost:9002/public/home.html
            app.use('/public', _express2.default.static(_path2.default.join(__dirname, '/../public')));
            app.use('/api/v1/product', _product.router);

            app.get('/test', function (req, res) {
              res.send('Hello');
            });

            app.use(function (_ref2, req, res, next) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  body = _ref3[0],
                  status = _ref3[1];

              res.status(status).json(body);
              next();
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

start();