import { CLOSE_SIDENAV, NOTIFICATION, OPEN_SIDENAV } from './../Types';



export const NavReducer = (state = { sideNavOpen : false, notification:{msg:null,type:null} }, action)=>{
    switch(action.type){
        case OPEN_SIDENAV:
            return{
                sideNavOpen: true,
                notification:state.notification,
            }
        case CLOSE_SIDENAV:
            return{
                sideNavOpen: false,
                notification:state.notification,
            }
        case NOTIFICATION:
            return{
                sideNavOpen: state.sideNavOpen,
                notification:{
                    msg:action.notification.msg,
                    type:action.notification.type
                },
            }
        default:
            return state
    }
}