import React, {Component} from "react";
import PropTypes from 'prop-types';
import NcGird from "./NcGrid";
import RenderColumn from './RenderColumn';
import isequal from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import ReactDOM from 'react-dom'
import { Button,Icon,ButtonGroup } from 'tinper-bee';


const propTypes = {
    onChange:PropTypes.func,//数据改变回调
    clsfix:PropTypes.string,
    onOpenChange:PropTypes.func,//展开收起回调
    title:PropTypes.string,
    disabled:PropTypes.bool,//是否可编辑
    onDel:PropTypes.func,
    defaultOpen:PropTypes.bool,//默认是否打开
}

const defaultProps = {
    title:'标题',
    clsfix:'ac-edit-grid',
    data: [],
    columns:[],
    onChange:()=>{},
    onOpenChange:()=>{},
    onDel:()=>{},
};

class EditGrid extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns:props.columns,
            data:props.data||[],
            selectData:[],//选中的数据
            copying:false,//是否正在拷贝
            open:props.defaultOpen||false,
            isMax:false
        }
    }

    componentWillMount(){
        this.setDataColumn(this.props.disabled,this.state.columns,this.state.data)
    }

    setDataColumn=(disabled,col,da)=>{
        if(disabled)return;
        let columns = col.slice();
        columns.forEach(item => {
            if(item.type){
                item.render=(text,record,index)=>{
                    return <RenderColumn
                                type={item.type}
                                index={index}
                                dataIndex={item.dataIndex}
                                value={text}
                                options={item.options}
                                onChange={this.onChange}
                                validate={item.validate} 
                                required={item.required}
                                pattern={item.pattern}
                                patternMessage={item.patternMessage}
                                iconStyle={item.iconStyle}
                                max={item.max}
                                min={item.min}
                                step={item.step} 
                                precision={item.precision}
                            />
                }
            }
        });
        this.setState({
            columns
        })

        //给data加index
        let data  = da.slice();
        if(data[0]&&data[0].index==1)return;
        data.forEach((item,index)=>{
            item.index=index+1
        })
        this.setState({
            data
        })
    }

    onChange=(index,key,value)=>{
        //改变data
        let data  = this.state.data.slice();
        data[index][key]=value;
        this.setState({
            data:data
        })
        this.props.onChange(data);
    }

    //选中数据的回调
    getSelectedDataFunc=(selectData)=>{
        let data = this.resetChecked(this.state.data)
        selectData.forEach((item)=>{
            data[item.index-1]._checked=!data[item.index-1]._checked
        })
        this.setState({
            selectData,
            data
        })
    }

    resetChecked=(dataValue)=>{
        let data = dataValue.slice();
        data.forEach((item,index)=>{
            item._checked=false
            item.index=index+1,
            item.key=index+1+''
        })
        return data
    }


    componentWillReceiveProps(nextProps){
        if(!isequal(nextProps.data,this.state.data)){
            nextProps.data.forEach((item,index)=>{
                item.index=index+1
            })
            this.setState({
                data:nextProps.data
            })
        }
        if('disabled' in nextProps){
            this.setDataColumn(nextProps.disabled,this.state.columns,nextProps.data)
        }
    }

    //打开关闭
    open=()=>{
        this.props.onOpenChange(!this.state.open)
        this.setState({
            open:!this.state.open
        })
    }

    //增行
    addRow=()=>{
        let data = this.state.data.slice();
        let length = data.length;
        let obj = cloneDeep(data[0]||{});
        for(let attr in obj){
            if(attr=='index'){
                obj.index=length+1;
            }else if(attr=='key'){
                obj.key=`${length+1}`;
            }else{
                obj[attr] = ''
            }
        }
        data.push(obj)
        this.props.onChange(data);
        this.setState({
            data
        })
    }

    //删行
    delRow=()=>{
        let {selectData} = this.state;
        let data = this.state.data.slice()
        data.splice(selectData[0].index-1,selectData.length);
        data = this.resetChecked(data)
        this.setState({
            data,
            selectData:[]
        })
        this.props.onChange(data)
        this.props.onDel(selectData)
    }
    //复制行
    copyRow=()=>{
        this.setState({
            copying:true
        })
    }
    //粘贴至末行
    copyToEnd=()=>{
        let {selectData,data} = this.state;
        selectData.forEach((item,index)=>{
            item.index = data.length+index+1;
            item.key = data.length+index+1+'';
            item._checked = false;
        })
        data = data.concat(selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })
        this.props.onChange(data)
    }
    //取消复制
    cancelCopy=()=>{
        this.setState({
            copying:false
        })
    }

    //最大化
    max=()=>{
        this.setState({
            isMax:!this.state.isMax
        })
    }
    //行hover
    onRowHover = (index,record) => {
        this.currentIndex = index;
    }

    //粘贴至此处按钮
    hoverContent=()=>{
        if(this.state.copying){
            return <span onClick={this.copyToHere} className='copy-to-here'>粘贴至此处</span>
        }else{
            return ''
        }
    }
    //粘贴至此处
    copyToHere=()=>{
        let index = this.currentIndex;
        let data = this.state.data.slice();
        let selectData = this.state.selectData;
        selectData.forEach((item,i)=>{
            item._checked=false
            item.index = i+index+1;
            item.key = i+index+1+'';
        })
        data.splice(index,0,...selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false
        })

        this.props.onChange(data)
    }

    renderDom=()=>{
        const { exportData, clsfix,title, data:propsData,columns:cl, ...otherProps } = this.props; 
        let { data,open,columns,copying,isMax } = this.state;
        let _exportData = exportData || data;
        return (
            <div className={`${clsfix} ${isMax?'max':''}`}>
                <div className={`${clsfix}-panel ${open?'':'close'}`}>
                    <span onClick={this.open}>
                        <span className={`${clsfix}-panel-icon`}>
                            {
                                open?<Icon type='uf-triangle-down'/>:<Icon type='uf-triangle-right'/>
                            }
                        </span>
                        <span className={`${clsfix}-panel-title`}>
                            {title}
                        </span>
                    </span>
                    {
                        open?<span className={`${clsfix}-panel-btns`}>
                            {
                                copying?<ButtonGroup>
                                            <Button bordered onClick={this.copyToEnd}>粘贴至末行</Button>
                                            <Button bordered onClick={this.cancelCopy}>取消</Button>
                                        </ButtonGroup>:<ButtonGroup>
                                                        <Button bordered onClick={this.addRow}>增行</Button>
                                                        <Button bordered disabled={this.state.selectData==0} onClick={this.delRow}>删行</Button>
                                                        <Button bordered disabled={this.state.selectData==0} onClick={this.copyRow}>复制行</Button>

                                                        {
                                                            isMax?<Button className='maxmin-btn' bordered onClick={this.max}><Icon type='uf-minimize'/></Button>
                                                            :<Button className='maxmin-btn' bordered onClick={this.max}><Icon type='uf-maxmize'/></Button>
                                                        }
                                                        
                                                    </ButtonGroup>
                            }
                        </span>:''
                    }
                    
                </div>
                <div className={`${clsfix}-inner ${open?'show':'hide'} ${isMax?'max':''}`}>
                            <NcGird
                                {...otherProps}
                                columns = {columns}
                                data={data}
                                exportData={_exportData}
                                paginationObj='none'
                                getSelectedDataFunc={this.getSelectedDataFunc}
                                hoverContent={this.hoverContent}
                                onRowHover={this.onRowHover}
                            />
                        </div>
            </div>
        )
        
    }

    render() {
        return (
            <span>
                {
                    this.state.isMax?ReactDOM.createPortal(this.renderDom(),document.querySelector('body')):this.renderDom()
                }
            </span>
        )
        
    }
}

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
export default EditGrid;
