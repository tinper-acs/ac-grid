/**
 * mdf参照
 */

//React导入
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import schema from 'async-validator';
import MdfRefer,{cb} from '@yonyou/mdf-refer'
import FieldWrap from './FieldWrap';
import isEqual from 'lodash.isequal'




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
    // valueField:PropTypes.string,//参照保存字段
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
        if(nextProps.value){
            if(isEqual(nextProps.value,this.props.value))this.model.setValue(nextProps.value);
        }
        
    }
    componentDidMount(){
        if(this.props.value)this.model.setValue(this.state.value);

        // document.addEventListener('click',(e)=>{
        //     let className=e.target.className;
        //     if(className=='ant-input'||
        //         className=='anticon anticon-canzhao'||
        //         className=='ac-grid-cell'){

        //     }else{
        //         this.props.onBlur()
        //     }
        // })
    }

    /**
     * 有输入值改变的回调
     *
     * @param {string} value
     */
    handlerChange = (value) => {
        value = value.value;
        if(typeof value == 'object'){
            if(value){
                value.id=value[this.model._get_data('valueField')];
                value.name=value[this.model._get_data('textField')];
            }
        }else{
            this.model.setValue(value)
        }
        
        let { onChange, field, index, status,valueField } = this.props;
        //处理是否有修改状态改变、状态同步之后校验输入是否正确
        this.setState({ value, flag: status == 'edit' }, () => {
            this.validate();
        });
        
        //回调外部函数
        onChange && onChange(field, value, index);
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
                <span ref='field'>
                    <MdfRefer
                        value={value}
                        onBlur={onBlur}
                        model={this.model}
                        modelName={'refer'}
                        config={
                            {
                                modelconfig:{
                                    afterValueChange:this.handlerChange
                                }
                            }
                        }
                    />
                </span>
            </FieldWrap>
        );
    }
}

ReferField.propTypes = propTypes;
ReferField.defaultProps = defaultProps;
export default ReferField;