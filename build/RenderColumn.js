'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('./RowField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _NumberField = require('./RowField/NumberField');

var _NumberField2 = _interopRequireDefault(_NumberField);

var _SelectField = require('./RowField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _RenderCell = require('./RenderCell');

var _RenderCell2 = _interopRequireDefault(_RenderCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onChange: _propTypes2["default"].func
};

var defaultProps = {
    onChange: function onChange() {}
};

var RenderColumn = function (_Component) {
    _inherits(RenderColumn, _Component);

    function RenderColumn(props) {
        _classCallCheck(this, RenderColumn);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getValue = function (text) {
            var _this$props = _this.props,
                type = _this$props.type,
                options = _this$props.options;

            var value = '';
            if (type && type == 'select') {
                options.forEach(function (item) {
                    if (item.value == text) {
                        value = item.key;
                    }
                });
            } else {
                value = text;
            }
            return value;
        };

        _this.onChange = function (index, dataIndex, value) {
            _this.getValue(value);
            _this.props.onChange(index, dataIndex, value);
        };

        _this.renderComp = function () {
            var _this$props2 = _this.props,
                type = _this$props2.type,
                value = _this$props2.value,
                index = _this$props2.index,
                dataIndex = _this$props2.dataIndex,
                validate = _this$props2.validate,
                disabled = _this$props2.disabled,
                options = _this$props2.options,
                required = _this$props2.required,
                pattern = _this$props2.pattern,
                patternMessage = _this$props2.patternMessage,
                iconStyle = _this$props2.iconStyle,
                max = _this$props2.max,
                min = _this$props2.min,
                step = _this$props2.step,
                precision = _this$props2.precision;

            switch (type) {
                case 'inputNumber':
                    return _react2["default"].createElement(
                        'div',
                        null,
                        disabled ? text : _react2["default"].createElement(
                            _RenderCell2["default"],
                            { text: value },
                            _react2["default"].createElement(_NumberField2["default"], {
                                field: dataIndex,
                                validate: validate,
                                required: required,
                                value: value,
                                pattern: pattern,
                                patternMessage: patternMessage,
                                iconStyle: iconStyle,
                                max: max,
                                min: min,
                                step: step,
                                precision: precision,
                                onChange: function onChange(field, v) {
                                    _this.props.onChange(index, dataIndex, v);
                                } })
                        )
                    );

                case 'input':
                    return _react2["default"].createElement(
                        'div',
                        null,
                        disabled ? text : _react2["default"].createElement(
                            _RenderCell2["default"],
                            { text: value },
                            _react2["default"].createElement(_TextField2["default"], {
                                field: dataIndex,
                                validate: validate,
                                required: required,
                                value: value,
                                pattern: pattern,
                                patternMessage: patternMessage,
                                onChange: function onChange(field, v) {
                                    _this.props.onChange(index, dataIndex, v);
                                } })
                        )
                    );

                case 'select':
                    return _react2["default"].createElement(
                        'div',
                        null,
                        disabled ? text : _react2["default"].createElement(
                            _RenderCell2["default"],
                            { text: _this.getValue(value) },
                            _react2["default"].createElement(_SelectField2["default"], {
                                data: options,
                                field: dataIndex,
                                validate: validate,
                                required: required,
                                value: value,
                                onChange: function onChange(field, v) {
                                    _this.onChange(index, dataIndex, v);
                                } })
                        )
                    );
            }
        };

        _this.state = {
            data: props.data
        };
        return _this;
    }

    /**
     * 渲染组件函数
     * @returns JSX
     */


    RenderColumn.prototype.render = function render() {
        return _react2["default"].createElement(
            'div',
            null,
            this.renderComp()
        );
    };

    return RenderColumn;
}(_react.Component);

RenderColumn.propTypes = propTypes;
RenderColumn.defaultProps = defaultProps;
exports["default"] = RenderColumn;
module.exports = exports['default'];