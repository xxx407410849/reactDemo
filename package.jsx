import React from 'react';
import ReactDOM from 'react-dom';
import {Route , Link ,BrowserRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './public/less/index.less';

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
            </ul>
            {this.props.children}
            </div>
        )
    }
}
ReactDOM.render(
    <BrowserRouter basename = "/dist/view/index.html">
    <Switch>
        <Route exact path = "/" component = {Demolist} />
        <Route path = "/code" component = {Codectncomponent}/>
        <Route path = "/checkbox" component = {Checkboxcomponent}/>
        <Route path = "/emotionList" component = {Todolistctncomponent} />
    </Switch>
    </BrowserRouter>,
    document.getElementById('reactRoot')
)