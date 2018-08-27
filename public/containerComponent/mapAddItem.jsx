import {connect} from 'react-redux'
import {addItem,changeItemData} from '../action/TodoListAction.jsx'
import Todolistctncomponent from '../dumbComponent/ItemAdd_Change.jsx'
const mapStateToProps = (state) => {
    return {
        itemList : state.get('Items')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeItemData : (id,item) => dispatch(changeItemData(id,item)),
        addItem : (item) => dispatch(addItem(item))
    }
}

const ItemAC = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todolistctncomponent)

module.exports = ItemAC