import React from 'react'
import Btncomponent from '../js/btn.jsx'

class Showemotioncomponent extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = "list-emotion">
            <span>{"分数: "+ this.props.value}</span>
            <span>{"Tips： " + this.props.tips}</span>
            <Btncomponent Click =  {(e)=>{this.props.deleteItem(this.props.id)}} name = "删除" Model = 'span'/>
            <Btncomponent Click = {(e)=>{this.props.changeItem(this.props.id); this.props.changeItem(this.props.id)}} name = "修改" Model = 'span' />
            </div>
        )
    }
}
module.exports = Showemotioncomponent;