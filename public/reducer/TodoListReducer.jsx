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
                state.get('itemList').map((item,idx)=>{
                    if(item.get('id') === action.id){
                        return state.deleteIn(['itemList',idx]);
                    }
                });
                return state
            }
        case CHANGE_ITEM : 
            return state.get('itemList').map((item,idx)=>{
                if(item.get('id') === action.id){
                    return state.setIn(['itemList',idx,'isChange'] , !(state.getIn(['itemList',idx,'isChange'])) )
                }
            })
        case ADD_ITEM : 
            {
                let itemList = state.get('itemList');
                itemList.push(Immutable.fromJS({
                    id : action.id,
                    item : action.item,
                    isChange : action.isChange
                }))
                return state.set('itemList',itemList);
            }
        case CHANGE_ITEM_DATA :
            return state.get('itemList').map((item,idx)=>{
                if(item.get('id') === action.id){
                    return state.setIn(['itemList',idx],action.item)
                }
            })
        default :
            return state
    }
}

export const App = combineReducers({
    itemList : Items,
})