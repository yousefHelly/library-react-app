import axios from 'axios';
import { CHANGE_CURRENT_PAGE, CHANGE_CURRENT_USER, CLOSE_SIDENAV, OPEN_SIDENAV, VISITOR, GET_REQUESTS, GET_BOOKS, GET_CURRENT_BOOK, GET_AUTHORS, GET_SEARCH_HISTORY, GET_AUTHORS_PAGE, GET_USERS, GET_SEARCH_BOOKS, UPDATE_SEARCH_VALUE, NOTIFICATION } from '../Types';
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
export const ShowNotification = (msg,type)=>{
    return{
        type:NOTIFICATION,
        notification:{
            msg:msg,
            type:type
        }
    }
}

//APIs actions

//books apis

export const GetAllBooks = (page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/bookspage/${page}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetMyRequestedBooks = (id,page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/getRequestedBooks/${id}/${page}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetAllMyBooks = (id,page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/getApprovedBooks/${id}/${page}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetCategoryBooks = (category,page=0)=>{
    return async(dispatch)=>{
        const booksData = await axios.get(`http://localhost:4000/field/${category}/${page}}`)
        dispatch({type:GET_BOOKS,Books:booksData.data,totalPages:booksData.data.numberOfPages,currentPage:booksData.data.currentPage})
    }
}
export const GetSearchedBooks = (currentUser,searchValue='',page=0)=>{
    const optimizedSearchValue = searchValue?searchValue.replace(/\s+/g,'-'):'';
    return async(dispatch)=>{
        const matchedBooks = await  axios.get(`http://localhost:4000/search/${currentUser}/${page}?search=${optimizedSearchValue}`)
        dispatch({type:GET_SEARCH_BOOKS,Books:matchedBooks.data,totalPages:matchedBooks.data.numberOfPages,currentPage:matchedBooks.data.currentPage,searchValue:searchValue})
    }
}
// update search query value when removing query
export const UpdateSearchValue = (searchValue='')=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_SEARCH_VALUE, searchValue:searchValue})
    }
}
// get specific book data
export const GetBook = (bookId)=>{
    return async(dispatch)=>{
        const bookData = await axios.get(`http://localhost:4000/books/${bookId}`)
        dispatch({type:GET_CURRENT_BOOK,CurrentBook:bookData.data})
    }
}
//get user's all requests
export const GetUserRequests = (currentUser)=>{
    return async(dispatch)=>{
        const UserRequests = await axios.get(`http://localhost:4000/request/${currentUser}`)
        dispatch({type:GET_REQUESTS,Requests:UserRequests.data})
    }
}
//author apis
export const GetAllAuthors = (page=0)=>{
    return async(dispatch)=>{
        const authorsData = await axios.get(`http://localhost:4000/getAllAuthors/${page}`)
        dispatch({type:GET_AUTHORS,Authors:authorsData.data,totalPages:authorsData.data.numberOfPages,currentPage:authorsData.data.currentPage})
    }
}
export const GetAuthorData = (author,page=0)=>{
    return async(dispatch)=>{
        const authorData = await axios.get(`http://localhost:4000/getAuthor/${author}/${page}`)
        dispatch({type:GET_AUTHORS_PAGE,authorBooks:authorData.data.books,totalPages:authorData.data.numberOfPages,currentPage:authorData.data.currentPage})
    }
}
export const GetAuthorsName = ()=>{
    return async(dispatch)=>{
        const authorsData = await axios.get(`http://localhost:4000/getAllAuthors`)
        dispatch({type:GET_AUTHORS,Authors:authorsData.data,totalPages:authorsData.data.numberOfPages,currentPage:authorsData.data.currentPage})
    }
}
//user's search history api
export const GetSearchHistory = (userId,page=0)=>{
    return async(dispatch)=>{
        const searchHistoryData = await axios.get(`http://localhost:4000/searchHistory/${userId}/${page}`)
        dispatch({type:GET_SEARCH_HISTORY,SearchHistory:searchHistoryData.data.searchHistory,totalPages:searchHistoryData.data.numberOfPages,currentPage:searchHistoryData.data.currentPage,userId:userId})
    }
}
//users apis
export const GetAllUsers = (page=0)=>{
    return async(dispatch)=>{
        const readerData = await axios.get(`http://localhost:4000/readerPages/${page}`)
        dispatch({type:GET_USERS,Users:readerData.data.users,totalPages:readerData.data.numberOfPages,currentPage:readerData.data.currentPage})
    }
}