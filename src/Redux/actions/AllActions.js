import axios from 'axios';
import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_USER, CLOSE_SIDENAV, OPEN_SIDENAV, VISITOR, GET_REQUESTS, GET_BOOKS, GET_CURRENT_BOOK, GET_AUTHORS, GET_SEARCH_HISTORY } from '../Types';
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

export const GetAllBooks = (page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/bookspage/${page}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetCategoryBooks = (category,page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/field/${category}/${page}}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetSearchedBooks = (currentUser,searchValue='')=>{
    searchValue = searchValue.replace(/\s+/g,'-');
    return async(dispatch)=>{
        const matchedBooks = await  axios.get(`http://localhost:4000/search/${currentUser}?search=${searchValue}`)
        dispatch({type:GET_BOOKS,Books:matchedBooks.data})
    }
}

export const GetBook = (bookId)=>{
    return async(dispatch)=>{
        const bookData = await axios.get(`http://localhost:4000/books/${bookId}`)
        dispatch({type:GET_CURRENT_BOOK,CurrentBook:bookData.data})
    }
}


export const GetAllRequests = (currentUser,searchValue='')=>{
    return async(dispatch)=>{
        const matchedBooks = await  axios.get(`http://localhost:4000/search/${currentUser}?search=${searchValue}`)
        dispatch({type:GET_REQUESTS,Books:matchedBooks.data})
    }
}

export const GetUserRequests = (currentUser)=>{
    return async(dispatch)=>{
        const UserRequests = await axios.get(`http://localhost:4000/request/${currentUser}`)
        dispatch({type:GET_REQUESTS,Requests:UserRequests.data})
    }
}

export const GetAllAuthors = (page=0)=>{
    return async(dispatch)=>{
        const authorsData = await axios.get(`http://localhost:4000/getAllAuthors/${page}`)
        dispatch({type:GET_AUTHORS,Authors:authorsData.data,totalPages:authorsData.data.numberOfPages,currentPage:authorsData.data.currentPage})
    }
}
export const GetAuthorsName = ()=>{
    return async(dispatch)=>{
        const authorsData = await axios.get(`http://localhost:4000/getAllAuthors`)
        dispatch({type:GET_AUTHORS,Authors:authorsData.data,totalPages:authorsData.data.numberOfPages,currentPage:authorsData.data.currentPage})
    }
}

export const GetSearchHistory = (userId,page=0)=>{
    return async(dispatch)=>{
        const searchHistoryData = await axios.get(`http://localhost:4000/searchHistory/${userId}/${page}`)
        dispatch({type:GET_SEARCH_HISTORY,SearchHistory:searchHistoryData.data.searchHistory,totalPages:searchHistoryData.data.numberOfPages,currentPage:searchHistoryData.data.currentPage,userId:userId})
    }
}