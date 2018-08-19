import React from 'react';
import ReactDOM from 'react-dom';
import './public/less/index.less';
import './public/js/react_demo.jsx';
import Immutabel from 'immutable';
import moment from 'moment';
//模态框，密码框
class Codectncomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : true,
            userCheck : true,
            passwordCheck : true,
            form : {
                userName : '',
                password : ''
            }
        }
    }
    _closeHandle(e){
        this.setState({
            display : false,
        })
    }
    _userChange(e){
        this.setState({
            form : {
                userName : e.target.value,
                password : this.state.form.password
            }
        })
        let userReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
        if(userReg.test(e.target.value)){
            this.setState({
                userCheck : true
            })
        }else{
            this.setState({
                userCheck : false
            })
        }
    }
    _passwordChange(e){
        this.setState({
            form : {
                password : e.target.value,
                userName : this.state.form.userName
            }
        })
        let passwordReg = /[a-zA-Z0-9^%&';=?$x22]{8,}/;
        if(passwordReg.test(e.target.value)){
            this.setState({
                passwordCheck : true
            })
        }else{
            this.setState({
                passwordCheck : false
            })
        }
    }
    _submitHandle(e){
        console.log(this.state.form.userName, this.state.form.password);
    }
    render(){
        return( 
        <div className = "code-ctn" style = {{display : this.state.display ? 'block' : 'none'}} >
            <div className = "title-ctn">
                <span>不要搁浅噢</span>
                <Closecomponent close = {(e)=>{this._closeHandle(e)}}/>
            </div>
            <div className = "body-ctn">
                <input type="text" className="username-ipt" name="username" onBlur = {(e)=>{this._userChange(e)}}/>
                <label style= {{display : this.state.userCheck ? 'none' : 'block'}}>请输入正确用户名</label>
                <input type="text" name="password" onBlur = {(e)=>{this._passwordChange(e)}} />
                <label style= {{display : this.state.passwordCheck ? 'none' : 'block'}}>密码非法</label>
            </div>
            <div className = "foot-ctn">
                <input type="button" className="ipt-btn" onClick = {(e)=>{this._submitHandle(e)}} value = "提交"/>
                <span className= "ipt-close" onClick = {(e)=>{this._closeHandle(e)}}>关闭</span>
            </div>
        </div>
        )
    }
}
class Closecomponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <span onClick = {(e) => {this.props.close(e)}} className = "close-x" > x </span>
        )
    }
}
//全选，反选
class Checkboxcomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chooseList : ['apple','lemon','melon','orange'],
            chooseCheck : 0,
            Allchoose : false,
            reverseCheck : false,
            isAuto : false
        }
    }
    Allchoose(e){
        if(this.state.Allchoose){
            this.setState({
                chooseCheck : 0,
                Allchoose : false,
                isAuto : false,
            })
        }else{
            this.setState({
                Allchoose : true,
                chooseCheck : this.state.chooseList.length,
                isAuto : false,
            });
        }
    }
    checkAllChoose(ItemChecked){
        if(this.state.isAuto = true)this.state.isAuto = false;
        ItemChecked ? this.state.chooseCheck++ : this.state.chooseCheck--;
        console.log(this.state.chooseCheck);
        if(this.state.chooseCheck == this.state.chooseList.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            if(this.state.Allchoose == true){
                this.setState({
                    Allchoose : false,
                    isAuto : true
                });
            }
        }
    }
    Reversechoose(e){
        let newNum = this.state.chooseList.length - this.state.chooseCheck;
        if(newNum == this.state.chooseList.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            this.setState({
                Allchoose : false,
                isAuto : true
            })
        }
        this.setState({
            reverseCheck : !this.state.reverseCheck,
            chooseCheck : this.state.chooseList.length - this.state.chooseCheck
        });
    }
    render(){
        return (
            <div>
                <span>全选</span>
                <input type="checkbox" value = '全选' onClick = {(e)=>{this.Allchoose(e)}} checked = {this.state.Allchoose} />
                <span>反选</span>
                <input type="checkbox" value = '反选' onClick = {(e)=>{this.Reversechoose(e)}} checked = {this.state.reverseCheck}/>
                {
                    this.state.chooseList.map((item,idx)=>{
                        return (
                            <div className = "checkbox-group" key = {idx} >
                                <span>{item} </span>
                                <CheckboxItemcomponent value = {item} checkAllChoose = {(ItemChecked)=>{this.checkAllChoose(ItemChecked)}} Allchoose = {this.state.Allchoose} Reverse = {this.state.reverseCheck} isAuto = {this.state.isAuto}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
class CheckboxItemcomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked : false,
        }
    }
    _clickHandle(e){
        this.props.checkAllChoose(!this.state.checked);
        this.setState({
            checked : this.state.checked ? false : true
        });
    }
    componentWillReceiveProps(nextprops){
        console.log(nextprops.isAuto);
        if(nextprops.isAuto == false)this.state.checked = nextprops.Allchoose;
        if(nextprops.Reverse != this.props.Reverse){
            this.setState({
                checked : !this.state.checked
            })
        }
    }
    render(){
        return (
            <input type="checkbox" value = {this.props.value} checked = {this.props.Allchoose ? this.props.Allchoose : this.state.checked} onClick = {(e)=>{this._clickHandle(e)}} />
        )
    }
}
class Todolistctncomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemList : Immutabel.fromJS([
                { name : '今日心情指数' , value : 0 },
                { name : '今日coding指数', value : 0},
                { name : '今日运气指数' , value : 0}
            ]),
            dataList : Immutabel.fromJS([
            ]),
            result : 0,
            tips : '',
            moment : ''
        }
        console.log(this.state.dataList);
    }
    _calulate(){
        let num = 0;
        this.state.itemList.forEach((item)=>{
            num = item.get('value') + num;
        });
        this.setState({
            result : Math.round(num/3)
        });
    }
    changeValue(value,idx){
        this.setState({
            itemList : this.state.itemList.setIn([idx, 'value'],value)
        });
        this._calulate();
    }
    _btnClickHandle(e){
        this.setState({
            dataList : this.state.dataList.push(Immutabel.fromJS({value : this.state.result , tips : this.state.tips , moment : moment().format('YY-MM-DD h:mm:ss')}))
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.itemList.map((item,idx)=>{
                        return <Draglinecomponent  lineWidth = '200' name = {item.get('name')} startLeft = '40' key = {item.get('name')} idx = {idx} value = {item.get('value')} changeValue = {(value,key)=>{this.changeValue(value,key)}}/>
                    })
                }
                <p className = "result-panel"> <span>{this.state.result}</span></p>
                <label htmlFor="ipt-tip" className = "tip-label">写一点感想</label>
                <input type="text" id = "ipt-tip" className = "ipt-tip"  onBlur = {(e)=>{this.setState({tips : e.target.value})}}/>
                <Btncomponent onClick = {(e)=>{this._btnClickHandle(e)}} name = "提交" />
                {
                    this.state.dataList.map((item)=>{
                        return (
                            <div key = {item.get('moment')}>
                            <span>{item.get('value')}</span>
                            <span>{item.get('tips')}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
class Btncomponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = "btn-div" onClick = {(e)=>{this.props.onClick(e)}}>{this.props.name}</div>
        )
    }
}
class Draglinecomponent extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            mouseStart : 0,
            lineWidth : parseInt(this.props.lineWidth),
            speed : parseInt(this.props.lineWidth) / 100,
            startLeft : parseInt(this.props.startLeft),
            canMove : false,
        }
    }
    _StartdragHandle(e){
        e.preventDefault();
        let mouseX = e.clientX;
        document.body.onmouseup = (e)=>{this._EnddragHandle(e)};
        document.body.onmousemove = (e)=>{this._IndragHandle(e)};
        document.body.ondragenter = (e)=>{e.preventDefault()};
        document.body.ondragleave = (e)=>{e.preventDefault()};
        this.setState({
            canMove : true,
            mouseStart : this.state.mouseStart == 0 ? mouseX : this.state.mouseStart
        });
    }
    _IndragHandle(e){
        e.preventDefault();
        if(!this.state.canMove) return;
        let mouseX = e.clientX;
        let nextvalue = (mouseX - this.state.mouseStart) / this.state.speed;
        if(nextvalue < 0) nextvalue = 0;
        if(this.props.value == 0 && nextvalue == 0)return;
        if(nextvalue > 100) nextvalue = 100;
        if(this.props.value == 100 && nextvalue == 100)return;
        this.props.changeValue(nextvalue,this.props.idx);
    }
    _EnddragHandle(e){
        this.setState({
            canMove : false
        });
        document.body.onmouseup = null;
        document.body.onmousemove = null;
        document.body.ondragenter = null;
        document.body.ondragleave = null;
    }
    render(){
        return (
            <div className = "drag-item">
                <span className = "drag-info">{this.state.name + ": " + this.props.value}</span>
                <div className = "drag-body">
                <div className = "drag-line" style = {{width :this.state.lineWidth}}></div>
                <div className = "drag-circle" style= {{left : this.state.startLeft + this.props.value * this.state.speed , position : 'absolute'}} onDrag = {(e)=>{e.preventDefault()}} onMouseDown = {(e)=>{this._StartdragHandle(e)}}></div>
                </div>
            </div>
        )
    }
}

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