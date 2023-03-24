import { CHANGE_CURRENT_BOOK, CLOSE_SIDENAV, OPEN_SIDENAV } from './../Types';



export const NavReducer = (state = { sideNavOpen : false }, action)=>{
    switch(action.type){
        case OPEN_SIDENAV:
            return{
                sideNavOpen: true,
            }
        case CLOSE_SIDENAV:
            return{
                sideNavOpen: false,
            }
        default:
            return state
    }
}