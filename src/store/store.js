import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/User/usersSlice';

export const store=configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer,
    }
})