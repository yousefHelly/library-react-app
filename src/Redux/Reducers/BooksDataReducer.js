import { GET_BOOKS, GET_CURRENT_BOOK, GET_SEARCH_BOOKS, UPDATE_SEARCH_VALUE } from "../Types"

export const BooksDataReducer = (state = { Books : [], CurrentBook: {}, totalPages:1 , currentPage:0, searchValue:'' }, action)=>{
    switch(action.type){
        case GET_BOOKS:
            return{
                Books: action.Books,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                CurrentBook:state.CurrentBook,
                searchValue:state.searchValue
            }
        case GET_SEARCH_BOOKS:
            return{
                Books: action.Books,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                CurrentBook:state.CurrentBook,
                searchValue:action.searchValue
            }
        case UPDATE_SEARCH_VALUE:
            return{
                Books:state.Books,
                totalPages:state.totalPages,
                currentPage:state.currentPage,
                CurrentBook:state.CurrentBook,
                searchValue:action.searchValue
            }
        case GET_CURRENT_BOOK:
            return{
                Books: state.Books,
                totalPages:state.totalPages,
                currentPage:state.currentPage,
                CurrentBook: action.CurrentBook,
                searchValue:state.searchValue
            }
        default:
            return state
    }
}