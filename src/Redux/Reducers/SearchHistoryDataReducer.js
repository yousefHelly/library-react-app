import { GET_SEARCH_HISTORY } from "../Types"

export const searchHistoryDataReducer = (state = { SearchHistory : [], totalPages:1, userId:null, currentPage:0 }, action)=>{
    switch(action.type){
        case GET_SEARCH_HISTORY:
            return{
                SearchHistory: action.SearchHistory,
                totalPages:action.totalPages,
                currentPage:action.currentPage,
                userId:action.userId,
            }
        default:
            return state
    }
}