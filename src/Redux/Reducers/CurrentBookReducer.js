import { CHANGE_CURRENT_BOOK, CLOSE_SIDENAV, OPEN_SIDENAV } from './../Types';



export const CurrentReducer = (state = { currentBook : 0 }, action)=>{
    switch(action.type){
        case CHANGE_CURRENT_BOOK:
            return{
                currentBook: action.index
            }
        default:
            return state
    }
}