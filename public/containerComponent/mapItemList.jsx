import {connect} from 'react-redux'
import {deleteItem,changeItem} from '../action/TodoListAction.jsx'
import ShowEmotionListComponent from '../dumbComponent/ShowEmotionList.jsx'
const mapStateToProps = (state) => {
    return {
        itemList : state.get('Items')
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem : (id) => dispatch(deleteItem(id)),
        changeItem : (id) => dispatch(changeItem(id))
    }
}

const ItemList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowEmotionListComponent)

module.exports = ItemList