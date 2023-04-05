import { CHANGE_CURRENT_USER, VISITOR } from "../Types"

export const CurrentUserReducer = (state = { currentUser : VISITOR }, action)=>{
    switch(action.type){
        case CHANGE_CURRENT_USER:
            return{
                currentUser: action.user
            }
        default:
            return state
    }
}