import { GET_REQUESTS } from "../Types"

export const RequestsReducer = (state = { Requests : [] }, action)=>{
    switch(action.type){
        case GET_REQUESTS:
            return{
                Requests: action.Requests
            }
        default:
            return state
    }
}