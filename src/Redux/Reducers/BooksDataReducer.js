import { GET_ALL_BOOKS, GET_SEARCHED_BOOKS } from "../Types"

export const BooksDataReducer = (state = { Books : [] }, action)=>{
    switch(action.type){
        case GET_ALL_BOOKS:
            return{
                Books: action.Books
            }
        case GET_SEARCHED_BOOKS:
            return{
                Books: action.Books
            }
        default:
            return state
    }
}