import React from 'react'
import Btncomponent from '../js/btn.jsx'
import Draglinecomponent from '../js/DragComponent.jsx'
import ItemList from '../containerComponent/mapItemList.jsx'
import moment from 'moment'
import Immutabel from 'immutable'
class Todolistctncomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataList : Immutabel.fromJS([
                { name : '今日心情指数' , value : 0 },
                { name : '今日coding指数', value : 0},
                { name : '今日运气指数' , value : 0}
            ]),
            result : 0,
            tips : '',
            moment : '',
            changeInfo : {
                id : 0,
                isChange : false
            }
        }
    }
    _calulate(){
        let num = 0;
        this.state.dataList.forEach((item)=>{
            num = item.get('value') + num;
        });
        this.setState({
            result : Math.round(num/3)
        });
    }
    changeValue(value,idx){
        this.setState({
            dataList : this.state.dataList.setIn([idx, 'value'],value)
        });
        this._calulate();
    }


    _btnClickHandle(e){
        let valueList = Immutabel.fromJS([]);
        this.state.dataList.forEach((item)=>{
            valueList = valueList.push(Immutabel.fromJS({value : item.get('value')}));
        });
        let Item = Immutabel.fromJS({
            value : this.state.result,
            valueList: valueList,
            tips : this.state.tips,
            moment : moment().format('YY-MM-DD h:mm:ss')
        })
        if(this.state.changeInfo.isChange){
            this.state.changeInfo.isChange = false;
            this.props.changeItemData(this.state.changeInfo.id,Item);
            this.setState({
                tips : ''
            })
        }else{
            this.props.addItem(Item);
            this.setState({
                tips : '',
            })
        }
    }

    changeBtnInfo(id){
        let $item;
        this.props.itemList.map((item)=>{
            if(item.get('id') === id) $item = item;
        });
        let newItemList = $item.getIn(['item','valueList']);
        console.log(newItemList);
        this.setState({
            dataList : this.state.dataList.mergeDeep(newItemList),
            result : $item.getIn(['item','value']),
            tips : $item.getIn(['item','tips']),
            changeInfo : {
                id : id,
                isChange : true
            }
        });
    }

    render(){
        return(
            <div>
                <div className = "drag-ctn">
                    {
                        this.state.dataList.map((item,idx)=>{
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
                        <ItemList changeItemInfo = {(id)=>{this.changeBtnInfo(id)}}/>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Todolistctncomponent;