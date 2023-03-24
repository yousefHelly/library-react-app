import { configureStore, createStore } from "@reduxjs/toolkit";
import { RootReducer } from './Reducers/RootReducer';

export const store = createStore(RootReducer)