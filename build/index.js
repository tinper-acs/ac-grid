'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AcGrid = require('./AcGrid');

var _AcGrid2 = _interopRequireDefault(_AcGrid);

var _EditGrid = require('./EditGrid');

var _EditGrid2 = _interopRequireDefault(_EditGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_AcGrid2["default"].EditGrid = _EditGrid2["default"];

exports["default"] = _AcGrid2["default"];
module.exports = exports['default'];