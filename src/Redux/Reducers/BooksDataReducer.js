import { GET_BOOKS, GET_CURRENT_BOOK } from "../Types"

export const BooksDataReducer = (state = { Books : [], CurrentBook: {}, totalPages:1 , currentPage:0 }, action)=>{
    switch(action.type){
        case GET_BOOKS:
            return{
                Books: action.Books,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                CurrentBook:state.CurrentBook
            }
        case GET_CURRENT_BOOK:
            return{
                Books: state.Books,
                totalPages:state.totalPages,
                currentPage:state.currentPage,
                CurrentBook: action.CurrentBook
            }
        default:
            return state
    }
}