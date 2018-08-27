import {
    DELETE_ITEM,
    CHANGE_ITEM,
    ADD_ITEM,
    CHANGE_ITEM_DATA
} from '../action/TodoListAction.jsx'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'

const Items = (state = Immutable.fromJS([]) , action) => {
    switch(action.type){
        case DELETE_ITEM :
            {
                let index;
                state.map((item,idx)=>{
                    if(item.get('id') === action.id){
                        index = idx;
                    }
                });
                return state.remove(index);
            }
        case CHANGE_ITEM : 
            {
                let index;
                state.map((item,idx)=>{
                    if(item.get('id') === action.id){
                        index = idx;
                    }
                })
                return state.setIn([index,'isChange'] , true);
            }
        case ADD_ITEM : 
            {
                return state.push(Immutable.fromJS({
                    id : action.id,
                    item : action.item,
                    isChange : action.isChange
                }))
            }
        case CHANGE_ITEM_DATA :
            {
                let index;
                state.map((item,idx)=>{
                    if(item.get('id') === action.id){
                        index = idx
                    }
                });
                return state.set(index,Immutable.fromJS({
                    id : action.id,
                    item : action.item,
                    isChange : false
                }))
            }

        default :
            return state
    }
}

/*const App = (state = Immutable.fromJS({}),action) => {
    return {
        itemList : Items(state,action)
    }
}*/

const App = combineReducers({
    Items,
})

module.exports = App;