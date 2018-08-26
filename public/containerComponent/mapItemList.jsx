import {connect} from 'react-redux'
import {deleteItem,changeItem} from '../action/TodoListAction.jsx'
import ShowEmotionListComponent from '../dumbComponent/ShowEmotionList.jsx'
const mapStateToProps = (state) => {
    return {
        itemList : state.get('itemList')
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteItem : dispatch(deleteItem(id)),
        changeItem : dispatch(changeItem(id))
    }
}

const itemList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowEmotionListComponent)

module.exports = itemList