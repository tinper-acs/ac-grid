
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './RowField/TextField';
import NumberField from './RowField/NumberField';
import SelectField from './RowField/SelectField';
import ReferField from './RowField/ReferField';
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
        let { type, value,index,dataIndex,
            textAlign, validate, disabled, 
            options,required,pattern,patternMessage,
            iconStyle, max, min, step, precision,
            cRefType,displayname,valueField,config,maxLength
        } = this.props;
        let placement = 'left';
        if(textAlign)placement=textAlign=='center'?'bottom':textAlign;
        switch (type) {
            case 'inputNumber':
                return (<div>
                        {
                            disabled?
                            <ToolTip overlay={value} inverse placement={placement}>
                                <span className='ac-grid-cell'>{value}</span>
                            </ToolTip>
                            :<RenderCell text = {value} textAlign={textAlign}>
                            <NumberField 
                                textAlign={textAlign}
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
            break;
            case 'input':
                return (<div>
                    {
                        disabled?
                        <ToolTip overlay={value} inverse placement={placement}>
                            <span className='ac-grid-cell'>{value}</span>
                        </ToolTip>:<RenderCell text = {value} textAlign={textAlign}>
                        <TextField 
                            maxLength={maxLength}
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
            break;
            case 'select':
                return (<div>
                        {
                            disabled?
                            <ToolTip inverse placement={placement} overlay={this.getValue(value)}>
                                <span className='ac-grid-cell'>{this.getValue(value)}</span>
                            </ToolTip>
                            :<RenderCell text ={this.getValue(value)} textAlign={textAlign}>
                                <SelectField 
                                    textAlign={textAlign}
                                    data={options}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    onChange={(field, v)=>{this.onChange(index,dataIndex,v)}} />
                            </RenderCell>
                        }
                    </div>
                )
            break;
            case 'refer':
                    return (<div>
                        {
                            disabled?
                            <ToolTip overlay={value} inverse placement={placement}>
                                <span className='ac-grid-cell'>{value}</span>
                            </ToolTip>:<RenderCell type='refer' text = {value} textAlign={textAlign}>
                            <ReferField 
                                cRefType={cRefType}
                                displayname={displayname}
                                valueField={valueField}
                                config={config}
                                textAlign={textAlign}
                                field={dataIndex}  
                                validate={validate} 
                                required={required} 
                                value={value} 
                                
                                onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}/>
                            </RenderCell>
                        }
                    </div>)
            break;
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
