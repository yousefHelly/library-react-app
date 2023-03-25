import { CHANGE_CURRENT_PAGE } from "../Types"

export const DetailsNavReducer = (state = { currentPage : 'HOME' }, action)=>{
    switch(action.type){
        case CHANGE_CURRENT_PAGE:
            return{
                currentBook: action.current
            }
        default:
            return state
    }
}