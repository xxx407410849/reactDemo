export const ADD_ITEM  = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const CHANGE_ITEM = 'CHANGE_ITEM'
export const CHANGE_ITEM_DATA = 'CHANGE_ITEM_DATA'

let nextid = 0;
export const addItem = (item) => {
    return {type : ADD_ITEM , id : nextid++ , isChange : false ,item}
}

export const deleteItem = (id) =>{
    return {type : DELETE_ITEM , id : id}
}

export const changeItem = (id) => {
    return {type : CHANGE_ITEM , id : id}
}

export const changeItemData = (id,item) => {
    return {type : CHANGE_ITEM_DATA , id : id , item}
}