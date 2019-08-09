
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './RowField/TextField';
import NumberField from './RowField/NumberField';
import SelectField from './RowField/SelectField';
import RenderCell from './RenderCell';

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

    


    /**
     * 渲染组件函数
     * @returns JSX
     */
    renderComp = () => {
        let { type, value,index,dataIndex, validate, disabled, options,required,pattern,patternMessage } = this.props;
        switch (type) {
            case 'inputNumber':
                return (<div>
                        {
                            disabled?text:<RenderCell text = {value}>
                            <NumberField 
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
 
            case 'input':
                return (<div>
                    {
                        disabled?text:<RenderCell text = {value}>
                        <TextField 
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
                            disabled?text:<RenderCell text = {value}>
                                <SelectField 
                                    data={options}
                                    field={dataIndex}  
                                    validate={validate} 
                                    required={required} 
                                    value={value} 
                                    onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}} data={options}/>
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
