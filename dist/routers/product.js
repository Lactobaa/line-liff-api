'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProduct = exports.insertProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.uploadFile = exports.router = undefined;

// export function getFile(req, res, next) {
//   try {
//     next(resp({ data: '' }));
//   } catch (err) {
//     next(resp({ message: err.message }, 400));
//   }
// }

var uploadFile = exports.uploadFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(img) {
    var image, base64Image, path, name, type, file;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            image = img || '';
            base64Image = image.split(';base64,').pop();
            path = 'public/images/uploads';
            name = (0, _moment2.default)().format('YYMMDDHHis');
            type = 'png';
            _context.next = 8;
            return (0, _mkdirp2.default)('' + path, function (err) {
              if (err) console.log('----> mkdirp', err);
            });

          case 8:
            file = path + '/' + name + '.' + type;
            _context.next = 11;
            return _fs2.default.writeFile(file, base64Image, { encoding: 'base64' }, function (err) {
              if (err) console.log('----> writeFile', err);
            });

          case 11:
            return _context.abrupt('return', file);

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            // next(resp({ message: err.message }, 400));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function uploadFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getAllProducts = exports.getAllProducts = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var db, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            db = _di.di.get('db');
            _context2.next = 4;
            return db.collection('products').find({}).toArray();

          case 4:
            data = _context2.sent;

            next((0, _resp.resp)({ data: data }));
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            next((0, _resp.resp)({ message: _context2.t0.message }, 400));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 8]]);
  }));

  return function getAllProducts(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getProductById = exports.getProductById = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var db, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            db = _di.di.get('db');
            _context3.next = 4;
            return db.collection('products').findOne({ _id: (0, _mongodb.ObjectId)(req.param.id) });

          case 4:
            data = _context3.sent;

            next((0, _resp.resp)({ data: data }));
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);

            next((0, _resp.resp)({ message: _context3.t0.message }, 400));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 8]]);
  }));

  return function getProductById(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var updateProduct = exports.updateProduct = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var body, optionData, fileName, db, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            body = req.body;
            optionData = {
              name: body.name,
              price: body.price
            };

            if (body.img) {
              fileName = uploadFile(body.img);

              optionData.img = fileName;
            }
            db = _di.di.get('db');
            _context4.next = 7;
            return db.collection('products').updateOne({ _id: (0, _mongodb.ObjectId)(req.params.id) }, { $set: optionData });

          case 7:
            _context4.next = 9;
            return db.collection('products').findOne({ _id: (0, _mongodb.ObjectId)(req.params.id) });

          case 9:
            data = _context4.sent;

            next((0, _resp.resp)({ data: data }));
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4['catch'](0);

            next((0, _resp.resp)({ message: _context4.t0.message }, 400));

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 13]]);
  }));

  return function updateProduct(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var insertProduct = exports.insertProduct = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var body, fileName, optionData, db, data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            body = req.body;
            _context5.next = 4;
            return uploadFile(body.img);

          case 4:
            fileName = _context5.sent;
            optionData = {
              name: body.name,
              price: body.price,
              img: fileName
            };
            db = _di.di.get('db');
            _context5.next = 9;
            return db.collection('products').insertOne(optionData);

          case 9:
            data = _context5.sent;

            console.log('data.ops[0]', data.ops[0]);
            next((0, _resp.resp)({ data: data.ops[0] }));
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5['catch'](0);

            next((0, _resp.resp)({ message: _context5.t0.message }, 400));

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 14]]);
  }));

  return function insertProduct(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteProduct = exports.deleteProduct = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var db;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            db = _di.di.get('db');

            console.log('delete', req.params.id);
            _context6.next = 5;
            return db.collection('products').deleteOne({ _id: (0, _mongodb.ObjectId)(req.params.id) });

          case 5:
            next((0, _resp.resp)({ message: 'success' }));
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            next((0, _resp.resp)({ message: _context6.t0.message }, 400));

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 8]]);
  }));

  return function deleteProduct(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _di = require('../di');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _resp = require('../utils/resp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = exports.router = _express2.default.Router();
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'public/images/upload');
  },
  filename: function filename(req, file, cb) {
    cb(null, 'img-' + (0, _moment2.default)().format('YYYYMMDDHHmmss') + '-' + file.originalname);
  }
});
var upload = (0, _multer2.default)({ storage: storage });

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/add', insertProduct);

router.put('/:id', updateProduct);

router.delete('/:id/delete', deleteProduct);
// router.post('/upload', upload.array('images'), uploadFile);