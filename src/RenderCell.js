
import React, { Component } from 'react';

class RenderCell extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:true,
            enter:false
        }
    }

    click=()=>{
        if(this.state.visible){
            setTimeout(() => {
                let input = document.querySelector('.triangle-flag .u-form-control');
                if(input)input.focus()
            }, 0);
        }
        this.setState({
            visible:!this.state.visible
        })
    }

    onMouseEnter=()=>{
        this.setState({
            enter:true
        })
    }

    onMouseLeave=()=>{
        this.setState({
            visible:true,
            enter:false
        })
    }

    renderSpan=(text)=>{
        if(this.state.visible){
            return (
                <span className={`nc-grid-cell ${this.state.enter?'enter':''}`} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} onClick={this.click}>{text}</span>
            )
        }else{
            return React.cloneElement(this.props.children,{
                onBlur:()=>{
                    this.setState({
                        visible:true,
                        enter:false
                    })
                }
            })
        }
    }

    render() {
        return this.renderSpan(this.props.text);
    }
}
export default RenderCell;
