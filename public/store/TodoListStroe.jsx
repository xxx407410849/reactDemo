import {createStore} from 'redux'
import App from '../reducer/TodoListReducer.jsx'
import Immatable from 'immutable'
let store = createStore(App,Immatable.fromJS({}));

import {addItem,deleteItem,changeItem} from '../action/TodoListAction.jsx'


console.log(store.getState());
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})