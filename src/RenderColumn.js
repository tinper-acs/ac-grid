
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './RowField/TextField';
import NumberField from './RowField/NumberField';
import SelectField from './RowField/SelectField';
import RenderCell from './RenderCell';
import ToolTip from 'bee-tooltip'

const propTypes = {
    onChange:PropTypes.func
}

const defaultProps = {
    onChange:()=>{}
}

class RenderColumn extends Component {

    constructor(props){
        super(props);
        this.state={
            data:props.data
        }
    }

    

    getValue=(text)=>{
        let { type,options } = this.props;
        let value = '';
        if(type&&type=='select'){
            options.forEach(item => {
                if(item.value==text){
                    value = item.key
                }
            });
        }else{
            value = text;
        }
        return value;
    }

    onChange=(index,dataIndex,value)=>{
        this.getValue(value);
        this.props.onChange(index,dataIndex,value);
    }

    /**
     * 渲染组件函数
     * @returns JSX
     */
    renderComp = () => {
        let { type, value,index,dataIndex,textAlign, validate, disabled, options,required,pattern,patternMessage,iconStyle, max, min, step, precision } = this.props;
        switch (type) {
            case 'inputNumber':
                return (<div>
                        {
                            disabled?
                            <ToolTip inverse overlay={text} placement='top'>
                                <span>{text}</span>
                            </ToolTip>
                            :<RenderCell text = {value} textAlign={textAlign}>
                            <NumberField 
                                field={dataIndex} 
                                validate={validate} 
                                required={required} 
                                value={value} 
                                pattern={pattern}
                                patternMessage={patternMessage}
                                iconStyle={iconStyle}
                                max={max}
                                min={min}
                                step={step} 
                                precision={precision}
                                onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}/>
                            </RenderCell>
                        }
                    </div>);
 
            case 'input':
                return (<div>
                    {
                        disabled?
                        <ToolTip overlay={text}>
                            {text}
                        </ToolTip>:<RenderCell text = {value} textAlign={textAlign}>
                        <TextField 
                            textAlign={textAlign}
                            field={dataIndex}  
                            validate={validate} 
                            required={required} 
                            value={value} 
                            pattern={pattern}
                            patternMessage={patternMessage}
                            onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}/>
                        </RenderCell>
                    }
                </div>);

            case 'select':
                return (<div>
                        {
                            disabled?
                            <ToolTip inverse overlay={text}>
                                {text}
                            </ToolTip>
                            :<RenderCell text ={this.getValue(value)} textAlign={textAlign}>
                                <SelectField 
                                    textAlign={textAlign}
                                    data={options}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    onChange={(field, v)=>{
                                        this.onChange(index,dataIndex,v)}} />
                            </RenderCell>
                        }
                    </div>
                )
        }
    }
    render() {
        return (<div>
            {this.renderComp()}
        </div>);
    }
}


RenderColumn.propTypes = propTypes;
RenderColumn.defaultProps = defaultProps;
export default RenderColumn;
