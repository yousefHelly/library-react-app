import { GET_USERS } from "../Types"

export const UsersDataReducer = (state = { Users : [], totalPages:1 , currentPage:0 }, action)=>{
    switch(action.type){
        case GET_USERS:
            return{
                Users: action.Users,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
            }
        default:
            return state
    }
}