import React from 'react';
import {NavLink} from 'react-router-dom';
import '../less/Breadcrumb.less';
class Breadcrumbcomponent extends React.Component {
    componentDidMount(){
        console.log(this.props.Itemlist)
    }
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = "Breadcrumb">
            {
                this.props.Itemlist.map((item,idx)=>{
                    return (
                    <NavLink key = {idx} to = {{
                        pathname : item.get('link'),
                        state : item.get('state')
                    }} activeClassName = "active-breadcrumb" strict>{item.get('name')}</NavLink>
                    )
                })
            }
            </div>
        )
    }
}

module.exports = Breadcrumbcomponent;