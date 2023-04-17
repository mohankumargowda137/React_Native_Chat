import { createSlice } from "@reduxjs/toolkit";

const initialState={loggedIn:false,userData:{},error:{}}

const userSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers: {
        login(state,action){
            state.userData=action.payload
            state.loggedIn=true;
        },
        loginerror(state,action){
            state.loggedIn=false;
            state.userData={};
            state.error=action.payload
        },
        logout(state,action){
            state.loggedIn=false;
            state.userData={};
        },
    },
    
})

export const userActions=userSlice.actions;

export {userSlice};