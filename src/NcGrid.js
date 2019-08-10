import React, {Component} from "react";
import PropTypes from 'prop-types'
import Grid, { GridToolBar } from "./Grid";
import { Pagination,Select } from 'tinper-bee';

const Option = Select.Option;


const propsTypes = {
    paginationObj:PropTypes.object,
    showPagination:PropTypes.bool
}

const defaultProps = {
    paginationObj:{},
    showPagination:true
}

class NcGrid extends Component {
    constructor(props){
        super(props)
        this.state={
            activePage:1
        }
        this.gird = React.createRef();
    }

    onSelectChange=(value)=>{
        this.props.paginationObj.onDataNumSelect&&this.props.paginationObj.onDataNumSelect(value)
    }
    exportExcel=()=>{
        this.grid.exportExcel();
    }
    render() {
        let { paginationObj,showPagination,...other } = this.props;
        return (
            <div className='ac-nc-grid-wrapper'>
              <Grid {...other} ref={ref=>this.grid=ref} />
              {
                  showPagination?<div className='ac-nc-grid-wrapper-pages'>
                    <Select onChange={this.onSelectChange} defaultValue='10'>
                        <Option value='10'>10条/页</Option>
                        <Option value='20'>20条/页</Option>
                        <Option value='50'>50条/页</Option>
                        <Option value='100'>100条/页</Option>
                    </Select>
                    <Pagination 
                        prev
                        next
                        size="sm"
                        gap={true}
                        items={0}
                        {...paginationObj}
                    />
                </div>:''
              }
              
            </div>
        );
    }
}

NcGrid.defaultProps = defaultProps;
NcGrid.propsTypes = propsTypes;
NcGrid.GridToolBar = GridToolBar;
export default NcGrid;
