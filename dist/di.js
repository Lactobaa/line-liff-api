"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DI = function () {
  function DI() {
    _classCallCheck(this, DI);

    this.dependencies = {};
  }

  _createClass(DI, [{
    key: "get",
    value: function get(name) {
      return this.dependencies[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      this.dependencies[name] = value;
    }
  }]);

  return DI;
}();

var di = exports.di = new DI();
exports.default = di;