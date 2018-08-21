import React from 'react';


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
        <div className = "container">
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

module.exports = Codectncomponent;