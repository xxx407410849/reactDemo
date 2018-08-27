import {createStore} from 'redux'
import App from '../reducer/TodoListReducer.jsx'
import Immatable from 'immutable'
let store = createStore(App,Immatable.fromJS({}));



console.log(store.getState());
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})