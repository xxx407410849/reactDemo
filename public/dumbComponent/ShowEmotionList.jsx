import React from 'react'
import Showemotioncomponent from './ShowEmotion.jsx'
import propTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
class ShowEmotionListComponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            this.props.itemList.map((item,idx)=>{
                <Showemotioncomponent key = {item.getIn(['item','moment'])}
                value = {item.getIn(['item','value'])} 
                tips = {item.getIn(['item','tips'])} 
                id = {item.get('id')} 
                deleteItem = {(id)=>{this.props.deleteItem(id)}}
                changeItem = {(id)=>this.props.changeItem(id)}
                />
            })
        )
    }
}

module.exports = ShowEmotionListComponent;