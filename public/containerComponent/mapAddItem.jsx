import {connect} from 'react-redux'
import {addItem,changeItemData} from '../action/TodoListAction.jsx'
import Todolistctncomponent from '../dumbComponent/ItemAdd_Change.jsx'
const mapStateToProps = (state) => {
    return {
        itemList : state.get('itemList')
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeItemData : dispatch(changeItemData(id,item)),
        addItem : dispatch(addItem(item))
    }
}

const itemA_C = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todolistctncomponent)

module.exports = itemA_C