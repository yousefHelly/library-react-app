import { GET_AUTHORS, GET_AUTHORS_PAGE } from "../Types"

export const AuthorDataReducer = (state = { Authors : [], totalPages:1 , currentPage:0, authorBooks:[] }, action)=>{
    switch(action.type){
        case GET_AUTHORS:
            return{
                Authors: action.Authors,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                authorBooks:state.authorBooks
            }
        case GET_AUTHORS_PAGE:
            return{
                authorBooks:action.authorBooks,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                Authors: state.Authors
            }
        default:
            return state
    }
}