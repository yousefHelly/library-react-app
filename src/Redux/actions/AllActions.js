import { current } from '@reduxjs/toolkit';
import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_USER, CLOSE_SIDENAV, OPEN_SIDENAV, VISITOR } from '../Types';
import { CHANGE_CURRENT_BOOK } from '../Types';
import { HOME } from './../Types';

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

//DetailsNav actions 

export const ChangeDetailsNav = (CurrentPage=HOME)=>{
    return{
        type:CHANGE_CURRENT_PAGE,
        current:CurrentPage
    }
}

//CurrentUser actions

export const ChangeCurrentUser = (currentUser=VISITOR)=>{
    return{
        type:CHANGE_CURRENT_USER,
        user:currentUser
    }
}