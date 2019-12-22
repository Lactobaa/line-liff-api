"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var resp = exports.resp = function resp(body) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

  return [body, status];
};