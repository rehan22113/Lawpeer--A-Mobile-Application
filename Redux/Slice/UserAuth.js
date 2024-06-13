import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    role:"client",
    id:"",
    user:{},
    token:""
}

const UserSlice = createSlice({
    name:"userauth",
    initialState,
    reducers:{
        LoginUser:(state,action)=>{
            state.isLoggedIn = true
            if(action.payload){
                state.id=action.payload.id
                state.role=action.payload.role
                state.token=action.payload.token
                state.user=action.payload.user
            }
        },
        LogoutUser:(state)=>{
            state.isLoggedIn=false;
            state.id=""
            state.token=""
            state.role=""
            state.user=""

        },
        RegisterRole:(state,action)=>{
            state.role = action.payload
        },

    }
})

export const {LoginUser,LogoutUser,RegisterRole} = UserSlice.actions
export default UserSlice.reducer