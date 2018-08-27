import React from 'react'
import Showemotioncomponent from './ShowEmotion.jsx'
import propTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
class ShowEmotionListComponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props);
        return (
            this.props.itemList.map((item)=>{
               return ( <Showemotioncomponent key = {item.get('id')}
                value = {item.getIn(['item','value'])} 
                tips = {item.getIn(['item','tips'])} 
                id = {item.get('id')} 
                deleteItem = {(id)=>{this.props.deleteItem(id)}}
                changeItem = {(id)=>this.props.changeItemInfo(id)}
                />
               )
            })
        )
    }
}

module.exports = ShowEmotionListComponent;