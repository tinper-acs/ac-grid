"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require("./Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _tinperBee = require("tinper-bee");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Option = _tinperBee.Select.Option;

var propsTypes = {
    paginationObj: _propTypes2["default"].object,
    showPagination: _propTypes2["default"].bool
};

var defaultProps = {
    paginationObj: {},
    showPagination: true
};

var AcGrid = function (_Component) {
    _inherits(AcGrid, _Component);

    function AcGrid(props) {
        _classCallCheck(this, AcGrid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onSelectChange = function (value) {
            _this.props.paginationObj.onDataNumSelect && _this.props.paginationObj.onDataNumSelect(value);
        };

        _this.exportExcel = function () {
            _this.grid.exportExcel();
        };

        _this.state = {
            activePage: 1
        };
        _this.gird = _react2["default"].createRef();
        return _this;
    }

    AcGrid.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            paginationObj = _props.paginationObj,
            showPagination = _props.showPagination,
            other = _objectWithoutProperties(_props, ["paginationObj", "showPagination"]);

        return _react2["default"].createElement(
            "div",
            { className: "ac-grid-wrapper" },
            _react2["default"].createElement(_Grid2["default"], _extends({}, other, { ref: function ref(_ref) {
                    return _this2.grid = _ref;
                } })),
            showPagination ? _react2["default"].createElement(
                "div",
                { className: "ac-grid-wrapper-pages" },
                _react2["default"].createElement(
                    _tinperBee.Select,
                    { onChange: this.onSelectChange, defaultValue: "10" },
                    _react2["default"].createElement(
                        Option,
                        { value: "10" },
                        "10\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "20" },
                        "20\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "50" },
                        "50\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "100" },
                        "100\u6761/\u9875"
                    )
                ),
                _react2["default"].createElement(_tinperBee.Pagination, _extends({
                    prev: true,
                    next: true,
                    size: "sm",
                    gap: true,
                    items: 0
                }, paginationObj))
            ) : ''
        );
    };

    return AcGrid;
}(_react.Component);

AcGrid.defaultProps = defaultProps;
AcGrid.propsTypes = propsTypes;
AcGrid.GridToolBar = _Grid.GridToolBar;
exports["default"] = AcGrid;
module.exports = exports["default"];