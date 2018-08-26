import React from 'react'

class Draglinecomponent extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            mouseStart : 0,
            lineWidth : parseInt(this.props.lineWidth),
            speed : parseInt(this.props.lineWidth) / 100,
            startLeft : parseInt(this.props.startLeft),
            canMove : false,
        }
    }
    _StartdragHandle(e){
        e.preventDefault();
        let mouseX = e.clientX;
        document.body.onmouseup = (e)=>{this._EnddragHandle(e)};
        document.body.onmousemove = (e)=>{this._IndragHandle(e)};
        document.body.ondragenter = (e)=>{e.preventDefault()};
        document.body.ondragleave = (e)=>{e.preventDefault()};
        this.setState({
            canMove : true,
            mouseStart : this.state.mouseStart == 0 ? mouseX : this.state.mouseStart
        });
    }
    _IndragHandle(e){
        e.preventDefault();
        if(!this.state.canMove) return;
        let mouseX = e.clientX;
        let nextvalue = (mouseX - this.state.mouseStart) / this.state.speed;
        if(nextvalue < 0) nextvalue = 0;
        if(this.props.value == 0 && nextvalue == 0)return;
        if(nextvalue > 100) nextvalue = 100;
        if(this.props.value == 100 && nextvalue == 100)return;

        this.props.changeValue(nextvalue,this.props.idx);
    }
    _EnddragHandle(e){
        this.setState({
            canMove : false
        });
        document.body.onmouseup = null;
        document.body.onmousemove = null;
        document.body.ondragenter = null;
        document.body.ondragleave = null;
    }
    render(){
        return (
            <div className = "drag-item">
                <span className = "drag-info">{this.state.name + ": " + this.props.value}</span>
                <div className = "drag-body">
                <div className = "drag-line" style = {{width :this.state.lineWidth}}></div>
                <div className = "drag-circle" style= {{left : this.state.startLeft + this.props.value * this.state.speed , position : 'absolute'}} onDrag = {(e)=>{e.preventDefault()}} onMouseDown = {(e)=>{this._StartdragHandle(e)}}></div>
                </div>
            </div>
        )
    }
}

module.exports = Draglinecomponent;