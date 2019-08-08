'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NcGrid = require('./NcGrid');

var _NcGrid2 = _interopRequireDefault(_NcGrid);

var _EditGrid = require('./EditGrid');

var _EditGrid2 = _interopRequireDefault(_EditGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_NcGrid2["default"].EditGrid = _EditGrid2["default"];

exports["default"] = _NcGrid2["default"];
module.exports = exports['default'];