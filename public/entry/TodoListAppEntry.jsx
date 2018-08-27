import React from 'react'
import ItemAC from '../containerComponent/mapAddItem.jsx'

class AppComponent extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <ItemAC />
            </div>
        )
    }
}

module.exports = AppComponent;