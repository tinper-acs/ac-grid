
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
        let { type, value,index,dataIndex, record, disabled, options } = this.props;
        switch (type) {
            case 'inputNumber'://开始时间
                return (<div>
                        {
                            disabled?text:<RenderCell text = {value}>
                            <NumberField value={value} onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}/>
                            </RenderCell>
                        }
                    </div>);
            case 'input':
                return (<div>
                    {
                        disabled?text:<RenderCell text = {value}>
                        <TextField value={value} onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}}/>
                        </RenderCell>
                    }
                </div>);
            case 'select':
                return (<div>
                        {
                            disabled?text:<RenderCell text = {value}>
                                <SelectField value={value} onChange={(field, v)=>{this.props.onChange(index,dataIndex,v)}} data={options}/>
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
