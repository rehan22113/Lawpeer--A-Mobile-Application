import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLoginView:'',
    currentUserName:'',
    currentUser:'',
    allUsers:[],
    allChatRooms:[],
    modalVisible:'',
    currentGroupName:'',
    allChatMessages:[],
    currentChatMesage:[]
}

const Chat = createSlice({
    name:"chat",
    initialState,
    reducers:{
        ChatRoom:(state,action)=>{
            state.allChatRooms=action.payload
            
        },

    }   
})

export const {ChatRoom} = Chat.actions
export default Chat.reducer