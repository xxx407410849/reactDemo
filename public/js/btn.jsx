import React from 'react'

class Btncomponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let HTML;
        switch (this.props.Model) {
            case 'div':
                HTML = <div className = "btn-div" onClick = {(e)=>{this.props.Click(e)}}>{this.props.name}</div>
                break;
            case 'span':
                HTML = <span className = "btn-span" onClick = {(e)=>{this.props.Click(e)}}>{this.props.name}</span>
                break;
            default:
                HTML = <div className = "btn-div" onClick = {(e)=>{this.props.Click(e)}}>{this.props.name}</div>
                break;
        };
        return (
            HTML
        )
    }
}
module.exports = Btncomponent;