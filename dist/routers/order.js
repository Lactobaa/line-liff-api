'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertOrder = exports.router = undefined;

var insertOrder = exports.insertOrder = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var body, db, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            body = req.body;
            db = _di.di.get('db');
            _context.next = 5;
            return db.collection('orders').insertOne(body);

          case 5:
            data = _context.sent;

            console.log('data.ops[0]', data.ops[0]);
            next((0, _resp.resp)({ data: data.ops[0] }));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            next((0, _resp.resp)({ message: _context.t0.message }, 400));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function insertOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _di = require('../di');

var _resp = require('../utils/resp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = exports.router = _express2.default.Router();

router.post('/add', insertOrder);