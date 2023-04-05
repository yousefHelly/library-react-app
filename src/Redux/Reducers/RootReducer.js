import { combineReducers } from "@reduxjs/toolkit"
import { CurrentReducer } from "./CurrentBookReducer";
import { NavReducer } from './NavReducer';
import { DetailsNavReducer } from './DetailsNavReducer';
import { CurrentUserReducer } from "./CurrentUserReducer";

export const RootReducer = 
    combineReducers(
        {
            nav:NavReducer,
            current: CurrentReducer,
            detailsNav:DetailsNavReducer,
            user:CurrentUserReducer
        }
    )