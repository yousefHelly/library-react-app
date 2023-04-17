import axios from 'axios';
import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_USER, CLOSE_SIDENAV, OPEN_SIDENAV, VISITOR, GET_ALL_BOOKS, GET_SEARCHED_BOOKS } from '../Types';
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

//APIs actions

export const GetAllBooks = ()=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/bookspage/0`)
        dispatch({type:GET_ALL_BOOKS,Books:booksData.data})
    }
}
export const GetSearchedBooks = (currentUser,searchValue='')=>{
    searchValue = searchValue.replace(/\s+/g,'-');
    console.log(`http://localhost:4000/search/${currentUser}?search=${searchValue}`);
    return async(dispatch)=>{
        const matchedBooks = await  axios.get(`http://localhost:4000/search/${currentUser}?search=${searchValue}`)
        dispatch({type:GET_SEARCHED_BOOKS,Books:matchedBooks.data})
    }
}