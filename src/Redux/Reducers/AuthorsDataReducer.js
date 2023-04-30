import { GET_AUTHORS } from "../Types"

export const AuthorDataReducer = (state = { Authors : [], totalPages:1 , currentPage:0 }, action)=>{
    switch(action.type){
        case GET_AUTHORS:
            return{
                Authors: action.Authors,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
            }
        default:
            return state
    }
}