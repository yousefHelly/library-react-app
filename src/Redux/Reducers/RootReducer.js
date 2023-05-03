import { combineReducers } from "@reduxjs/toolkit"
import { CurrentReducer } from "./CurrentBookReducer";
import { NavReducer } from './NavReducer';
import { DetailsNavReducer } from './DetailsNavReducer';
import { CurrentUserReducer } from "./CurrentUserReducer";
import { BooksDataReducer } from "./BooksDataReducer";
import { RequestsReducer } from "./RequestsReducer";
import { AuthorDataReducer } from "./AuthorsDataReducer";
import { searchHistoryDataReducer } from "./SearchHistoryDataReducer";
import { UsersDataReducer } from "./UsersDataReducer";

export const RootReducer = 
    combineReducers(
        {
            nav:NavReducer,
            current:CurrentReducer,
            detailsNav:DetailsNavReducer,
            user:CurrentUserReducer,
            booksData:BooksDataReducer,
            requestsData:RequestsReducer,
            authorsData:AuthorDataReducer,
            searchHistoryData:searchHistoryDataReducer,
            usersData:UsersDataReducer,
        }
    )