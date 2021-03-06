import React from 'react';
import ReactDOM from 'react-dom';
import {Route , Link ,BrowserRouter, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './public/reducer/TodoListReducer.jsx';
import combineReducers from 'redux-immutable';
import Loadable from 'react-loadable';
import Immutable from 'immutable';
import './public/less/index.less';

const initialState = Immutable.fromJS({});
let store = createStore(App,initialState);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState().get('Items'))
})

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const Codectncomponent = Loadable({
    loader: () => import('./public/js/passwordModel.jsx'),
    loading: MyLoadingComponent
})
const Checkboxcomponent = Loadable({
    loader: () => import('./public/js/checkbox.jsx'),
    loading: MyLoadingComponent
})
const Todolistctncomponent = Loadable({
    loader: () => import('./public/js/Todolist.jsx'),
    loading: MyLoadingComponent
})

const Breadcrumbcomponet = Loadable({
    loader: () => import('./public/js/Breadcrumb.jsx'),
    loading: MyLoadingComponent
})

const Appcomponent = Loadable({
    loader: () => import('./public/entry/TodoListAppEntry.jsx'),
    loading: MyLoadingComponent
})

class AppReduxEntry extends React.Component{
    render(){
        return (
        <Provider store = {store}>
            <Appcomponent />
        </Provider>
        )
    }
}

class Breadcrumb extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let Breadcrumboption = Immutable.fromJS([{
            name : 'Emotioncontrol',
            link : '/emotionList',
            state : null
        },{
            name : 'caculate',
            link : '/emotionList/caculate',
            state : null
        }]);
        return (
            <Breadcrumbcomponet Itemlist = {Breadcrumboption} />
        )
    }
}

class Demolist extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>Demolist</h1>
            <ul>
                <li><Link to = "/code">code</Link></li>
                <li><Link to = "/checkbox">checkbox</Link></li>
                <li><Link to = "/emotionList">Emotion</Link></li>
                <li><Link to = "/emotionListRedux">Emotion-redux</Link></li>
            </ul>
            </div>
        )
    }
}


ReactDOM.render(
    <BrowserRouter basename = "/dist/view/index.html">
    <div>
        <Route path = "/" component = {Demolist} />
        <Route path = "/emotionList" component = {Breadcrumb} />
        <Switch>  
            <Route exact path = "/code" component = {Codectncomponent}/>
            <Route exact path = "/checkbox" component = {Checkboxcomponent}/>
            <Route exact path = "/emotionList" component = {Todolistctncomponent} />
            <Route exact path = "/emotionListRedux" component = {AppReduxEntry} />
        </Switch>
    </div>
    </BrowserRouter>,
    document.getElementById('reactRoot')
)