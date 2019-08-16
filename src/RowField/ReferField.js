/**
 * Text (文本输入框)
 */

//React导入
import React, { Component } from 'react';
//类型校验
import PropTypes from 'prop-types';
//验证组件 https://www.npmjs.com/package/async-validator
import schema from 'async-validator';
//Tinper-bee
import MdfRefer,{cb} from '@yonyou/mdf-refer'
import FieldWrap from './FieldWrap'



//类型校验
const propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    field: PropTypes.string,
    index: PropTypes.number,
    message: PropTypes.string,
    data: PropTypes.array,
    required: PropTypes.bool,
    onValidate: PropTypes.func,
    isFlag: PropTypes.bool,
    validate: PropTypes.bool,
    cRefType:PropTypes.string.isRequired,//参照唯一标示
    displayname:PropTypes.string,//参照展示字段
    valueField:PropTypes.string,//参照保存字段
};

//默认参数值
const defaultProps = {
    field: '',
    index: '',
    message: '请输入此字段',
    data: [],
    required: false,
    isFlag: false,
    validate: false,
    className: '',
    displayname:'name',
    valueField:'id'
}

class ReferField extends Component {
    /**
     * Creates an instance of ReferField.
     * @param {*} props
     * @memberof ReferField
     */
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            flag: false,
            error: false
        };

        this.model=new cb.models.ReferModel({
            cRefType:props.cRefType,
            displayname:props.displayname
        })
    }
    /**
     *  参数发生变化回调
     *
     * @param {object} nextProps 即将更新Props
     * @param {object} nextState 即将更新State
     * @memberof NumberField
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.validate == true) {
            this.validate();
        }
    }

    /**
     * 有输入值改变的回调
     *
     * @param {string} value
     */
    handlerChange = (value) => {
        let { onChange, field, index, status,valueField } = this.props;
        //处理是否有修改状态改变、状态同步之后校验输入是否正确
        this.setState({ value, flag: status == 'edit' }, () => {
            this.validate();
        });
        //回调外部函数
        onChange && onChange(field, value[valueField], index);
    }
    /**
     * 校验方法
     *
     */
    validate = () => {
        let { required, field, index, onValidate,pattern,patternMessage } = this.props;
        let { value } = this.state;
        //设置校验规则
        let descriptor = {
            [field]: 
            [
                { required }
            ]
            
        }
        if(pattern){
            descriptor[field].push({
                pattern:pattern,message:patternMessage
            })
        }
        let validator = new schema(descriptor);
        validator.validate({ [field]: value }, (errors, fields) => {
            if (errors) {
                this.setState({
                    error: true
                });
            } else {
                this.setState({
                    error: false
                });
            }
            onValidate && onValidate(field, fields, index);
        });
    }
    render() {
        let { value, error, flag } = this.state;
        let { className,cRefType,displayname,valueField,config={}, message, required, onBlur, pattern,patternMessage } = this.props;
        return (
            <FieldWrap
                required={required}
                error={error}
                message={pattern?patternMessage:message}
                flag={flag}
            >
                <MdfRefer
                    value={value}
                    onChange={this.handlerChange}
                    onBlur={onBlur}
                    model={this.model}
                    modelName={'refer'}
                    config={config}
                />
            </FieldWrap>
        );
    }
}

ReferField.propTypes = propTypes;
ReferField.defaultProps = defaultProps;
export default ReferField;