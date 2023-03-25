import { combineReducers } from "@reduxjs/toolkit"
import { CurrentReducer } from "./CurrentBookReducer";
import { NavReducer } from './NavReducer';
import { DetailsNavReducer } from './DetailsNavReducer';

export const RootReducer = 
    combineReducers(
        {
            nav:NavReducer,
            current: CurrentReducer,
            detailsNav:DetailsNavReducer
        }
    )