import { CLOSE_SIDENAV, OPEN_SIDENAV } from '../Types';
import { CHANGE_CURRENT_BOOK } from '../Types';

//Side Navbar actions 
export const openNav = {type:OPEN_SIDENAV}

export const closeNav = {type:CLOSE_SIDENAV}

//Current Book actions 

export const ChangeCurrent =  (BookIndex=0) => {
    return{
        type:CHANGE_CURRENT_BOOK,
        index:BookIndex
    }
}
