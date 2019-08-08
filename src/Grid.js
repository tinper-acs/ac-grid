import React, {Component} from "react";
import BeeGrid,{GridToolBar}  from "bee-complex-grid";

const defaultProps = {
    headerScroll: false,
    bordered: false,
    data: []
};

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { paginationObj, data,  ...otherProps } = this.props;
        return (
            <BeeGrid
                {...otherProps}
                className="ac-nc-grid"
                data={data}
                paginationObj='none'  
                columnFilterAble={false}
            />
        );
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;
export default Grid;
