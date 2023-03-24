import { combineReducers } from "@reduxjs/toolkit"
import { CurrentReducer } from "./CurrentBookReducer";
import { NavReducer } from './NavReducer';

export const RootReducer = 
    combineReducers(
        {
            nav:NavReducer,
            current: CurrentReducer
        }
    )