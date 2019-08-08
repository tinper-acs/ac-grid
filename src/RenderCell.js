
import React, { Component } from 'react';

class RenderCell extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:true
        }
    }

    click=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }

    renderSpan=(text)=>{
        if(this.state.visible){
            return (
                <span className='nc-grid-cell' onClick={this.click}>{text}</span>
            )
        }else{
            return this.props.children;
        }
    }

    render() {
        return this.renderSpan(this.props.text);
    }
}
export default RenderCell;
