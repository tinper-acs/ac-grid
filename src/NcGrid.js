import React, {Component} from "react";
import Grid, { GridToolBar } from "./Grid";

const defaultProps = {

}

class NcGrid extends Component {
   
    render() {
        return (
            <div className='ac-nc-grid-wrapper'>
              <Grid {...this.props}/>
            </div>
        );
    }
}

NcGrid.defaultProps = defaultProps;
NcGrid.GridToolBar = GridToolBar;
export default NcGrid;
