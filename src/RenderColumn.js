
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './RowField/TextField';
import NumberField from './RowField/NumberField';
import SelectField from './RowField/SelectField';
import DateField from './RowField/DateField';
import YearField from './RowField/YearField';
import RenderCell from './RenderCell';
import ToolTip from 'bee-tooltip';

const propTypes = {
    onChange:PropTypes.func,
    filedProps:PropTypes.object,//filed属性
}

const defaultProps = {
    onChange:()=>{},
    filedProps:{}
}

class RenderColumn extends Component {

    constructor(props){
        super(props);
        this.state={
            data:props.data
        }
    }

    

    getValue=(text)=>{
        let { renderType,filedProps } = this.props;
        let { options=[],defaultValue } = filedProps;
        let value = defaultValue!=undefined?defaultValue:'';
        if(renderType&&renderType=='select'){
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
        let { renderType, value,index,dataIndex,
            textAlign, validate, disabled, 
            options,required,pattern,patternMessage,
            customizeRender,valueField,
            defaultValue,filedProps,onValidate,record
        } = this.props;
        let placement = 'left';
        if(textAlign)placement=textAlign=='center'?'bottom':textAlign;
        if(customizeRender){
            let customizeRenderText = customizeRender.type&&customizeRender.type.customizeRenderText;
            let text = customizeRenderText?customizeRenderText({
                ...filedProps,
                value,
                field: dataIndex,
                record,
                index
            }):value;
            return (<div>
                {
                    disabled?
                    <ToolTip overlay={text} inverse placement={placement}>
                        <span className='ac-grid-cell'>{text}</span>
                    </ToolTip>:<RenderCell renderType='refer' text = {value} textAlign={textAlign}>
                    {
                        React.cloneElement(customizeRender,{
                            valueField:valueField,
                            textAlign:textAlign,
                            field:dataIndex,
                            validate:validate,
                            required:required,
                            value:value,
                            onValidate:onValidate,
                            index:index,
                            record:record,
                            onChange:(field, v)=>{this.props.onChange(index,dataIndex,v)},
                            ...filedProps
                        })
                    }
                    </RenderCell>
                }
            </div>)
        }else{
            switch (renderType) {
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
                                        onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                        />
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
                            </ToolTip>
                            :<RenderCell text = {value} textAlign={textAlign}>
                                <TextField 
                                    textAlign={textAlign}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    pattern={pattern}
                                    patternMessage={patternMessage}
                                    onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}
                                    onValidate={onValidate}
                                    index={index}
                                    {...filedProps}
                                />
                            </RenderCell>
                        }
                    </div>);
                break;
                case 'select':
                    value = value?value:filedProps.defaultValue;
                    return (<div>
                            {
                                disabled?
                                <ToolTip inverse placement={placement} overlay={this.getValue(value)}>
                                    <span className='ac-grid-cell'>{this.getValue(value)}</span>
                                </ToolTip>
                                :<RenderCell text ={this.getValue(value)} textAlign={textAlign}>
                                    <SelectField 
                                        textAlign={textAlign}
                                        data={filedProps.options||[]}
                                        field={dataIndex}  
                                        validate={validate} 
                                        required={required} 
                                        value={value} 
                                        onChange={(field, v)=>{this.onChange(index,dataIndex,v)}} 
                                        onValidate={onValidate}
                                        index={index}
                                        {...filedProps}
                                        />
                                </RenderCell>
                            }
                        </div>
                    )
                break;
                case 'datepicker':
                    value = value && value._isAMomentObject ? value.format('YYYY-MM-DD') : value;
                    return (<div>
                        {
                            disabled?
                            <ToolTip overlay={value} inverse placement={placement}>
                                <span className='ac-grid-cell'>{value}</span>
                            </ToolTip>
                            :<RenderCell text = {value} textAlign={textAlign}>
                                <DateField 
                                    textAlign={textAlign}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    pattern={pattern}
                                    patternMessage={patternMessage}
                                    onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}
                                    onValidate={onValidate}
                                    index={index}
                                    {...filedProps}
                                />
                            </RenderCell>
                        }
                    </div>);
                break;
                case 'year':
                    return (<div>
                        {
                            disabled?
                            <ToolTip overlay={value} inverse placement={placement}>
                                <span className='ac-grid-cell'>{value}</span>
                            </ToolTip>
                            :<RenderCell text = {value} textAlign={textAlign}>
                                <YearField 
                                    textAlign={textAlign}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    pattern={pattern}
                                    patternMessage={patternMessage}
                                    onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}
                                    onValidate={onValidate}
                                    index={index}
                                    {...filedProps}
                                />
                            </RenderCell>
                        }
                    </div>);
                break;
            }
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
