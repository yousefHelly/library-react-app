import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
import { RootReducer } from './Reducers/RootReducer';
import thunk from 'redux-thunk'
export const store = createStore(RootReducer,applyMiddleware(thunk))