import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { conversationSlice } from "./conversation/conversation";

const store=configureStore({
    reducer:{
        user:userSlice.reducer,
        conversation:conversationSlice.reducer
    }
})


export default store;