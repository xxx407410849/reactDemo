import React from 'react';
import ReactDOM from 'react-dom';
import './public/less/index.less';
import  Codectncomponent  from './public/js/passwordModel.jsx';
import  Checkboxcomponent  from './public/js/checkbox.jsx';
import  Todolistctncomponent  from './public/js/Todolist.jsx';

ReactDOM.render(
    <div>
        <div className = "container">
            <Codectncomponent />
        </div>
        <div className = "checkbox-ctn">
            <Checkboxcomponent />
        </div>
        <div className = "drag-ctn">
            <Todolistctncomponent />
        </div>
    </div>,
    document.getElementById('reactRoot')
)