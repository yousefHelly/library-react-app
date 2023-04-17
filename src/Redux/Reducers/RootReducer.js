import { combineReducers } from "@reduxjs/toolkit"
import { CurrentReducer } from "./CurrentBookReducer";
import { NavReducer } from './NavReducer';
import { DetailsNavReducer } from './DetailsNavReducer';
import { CurrentUserReducer } from "./CurrentUserReducer";
import { BooksDataReducer } from "./BooksDataReducer";

export const RootReducer = 
    combineReducers(
        {
            nav:NavReducer,
            current: CurrentReducer,
            detailsNav:DetailsNavReducer,
            user:CurrentUserReducer,
            booksData:BooksDataReducer
        }
    )