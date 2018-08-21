import React from 'react';
import Btncomponent from './btn.jsx';
import Immutabel from 'immutable';
import moment from 'moment';
import '../less/index.less';
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
            moment : '',
            changeInfo : {
                idx : 0,
                isChange : false
            }
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
        let valueList = [];
        this.state.itemList.forEach((item,idx)=>{
            valueList.push(item.get('value'));
        });
        console.log(valueList);
        if(this.state.changeInfo.isChange){
            this.state.changeInfo.isChange = false;
            this.setState({
                dataList : this.state.dataList
                .setIn([this.state.changeInfo.idx , 'value'] , this.state.result)
                .setIn([this.state.changeInfo.idx , 'tips'] , this.state.tips)
                .setIn([this.state.changeInfo.idx , 'valuelist'] , this.valueList),
                tips : ''
            })
        }else{
            this.setState({
                dataList : this.state.dataList.push(Immutabel.fromJS({value : this.state.result , valueList: valueList ,tips : this.state.tips , moment : moment().format('YY-MM-DD h:mm:ss')})),
                tips : '',
            },()=>{
                console.log(this.state);
            })
        }
    }
    deleteDataItem(idx){
        this.setState({
            dataList : this.state.dataList.set(idx,null)
        })
    }
    changeDataItemValue(idx){
        let newItemList = this.state.dataList.getIn([idx,'valueList']);
        newItemList.forEach((item,idx)=>{
            newItemList = newItemList.set(idx,Immutabel.fromJS({value : item}));
        });
        this.setState({
            changeInfo : {
                idx : idx,
                isChange : true
            },
            tips : this.state.dataList.getIn([idx,'tips']),
            result : this.state.dataList.getIn([idx,'value']),
            itemList : this.state.itemList.mergeDeep(newItemList)
        })
    }
    render(){
        return(
            <div className = "drag-ctn">
                {
                    this.state.itemList.map((item,idx)=>{
                        return <Draglinecomponent  lineWidth = '200' name = {item.get('name')} startLeft = '40' key = {item.get('name')} idx = {idx} value = {item.get('value')} changeValue = {(value,key)=>{this.changeValue(value,key)}}/>
                    })
                }
                <p className = "result-panel"><span>今日得分:</span> <span>{this.state.result}</span></p>
                <div className = "ipt-panel">
                    <label htmlFor="ipt-tip" className = "tip-label">写一点感想</label>
                    <input type="text" id = "ipt-tip" className = "ipt-tip" value = {this.state.tips} onChange = {(e)=>{this.setState({tips : e.target.value})}}/>
                </div>
                <Btncomponent Model = 'div' Click = {(e)=>{this._btnClickHandle(e)}} name = "提交" />
                <div className = "emotion-panel">
                    {
                        this.state.dataList.map((item,idx)=>{
                            if(item == null)return;
                            return (
                                <Showemotioncomponent key = {item.get('moment')}
                                    value = {item.get('value')} 
                                    tips = {item.get('tips')} 
                                    idx = {idx} 
                                    delete = {(idx)=>{this.deleteDataItem(idx)}}
                                    _changeHandle = {(idx)=>this.changeDataItemValue(idx)} 
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
class Showemotioncomponent extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = "list-emotion">
            <span>{"分数: "+ this.props.value}</span>
            <span>{"Tips： " + this.props.tips}</span>
            <Btncomponent Click =  {(e)=>{this.props.delete(this.props.idx)}} name = "删除" Model = 'span'/>
            <Btncomponent Click =  {(e)=>{this.props._changeHandle(this.props.idx)}} name = "修改" Model = 'span'/>
            </div>
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

module.exports = Todolistctncomponent;