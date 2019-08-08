import React, {Component} from "react";
import BeeGrid,{GridToolBar}  from "bee-complex-grid";

const defualtPaginationParam = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"],
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    dataNum: 4,
    btnType: {shape: 'border'},
    noBorder: true,
    confirmBtn: () => null
};
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
            <div className='ac-nc-grid-wrapper'>
                <BeeGrid
                    {...otherProps}
                    className="ac-nc-grid"
                    data={data}
                    paginationObj='none'
                    
                />
            </div>
        );
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;
export default Grid;
