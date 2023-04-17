import { createSlice } from "@reduxjs/toolkit";

const initialState={messages:{},conversationId:null,conversedUsers:[],unconversedUsers:[]}

const conversationSlice=createSlice({
    name:"conversation",
    initialState:initialState,
    reducers: {
        updateConversedUsersOrder(state,action){
            state.conversedUsers=state.conversedUsers.filter((item)=>{
                return item.conversation_id!=action.payload.conversation_id
            })
            state.conversedUsers.unshift(action.payload)
        },
        removeFromUnconversedUser(state,action){
            state.unconversedUsers=state.unconversedUsers.filter((item)=>{
                return item.user_id!=action.payload.user
            })
            state.conversedUsers.unshift(action.payload)
        },
        setUnconversedUsers(state,action){
            state.unconversedUsers=action.payload
        },
        setConversedUsers(state,action){
            state.conversedUsers=action.payload
        },
        setConversationId(state,action){
            state.conversationId=action.payload
        },
        loadMessages(state,action){
            state.messages=action.payload
        }
    },
    
})

export const conversationActions=conversationSlice.actions;

export {conversationSlice};