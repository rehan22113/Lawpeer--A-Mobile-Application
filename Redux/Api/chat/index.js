import { mainApi } from "../main"

const chatApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getUserRoom: build.mutation({
            query:(id)=>({
                url:`/chat/chat-rooms/user/${id}`,
                method:'GET',
            }),
            providesTags:['Chat']
        }),
        getRoomByName:build.mutation({
            query:(roomName)=>({
                url:`/chat/chat-rooms/${roomName}`,
                method:'GET',
            })
        }),
        getAllMessages: build.mutation({
            query:(room_id)=>({
                url:`/chat/room-messages/${room_id}`,
                method:'GET',
            })
        }),
        createNewRoom:build.mutation({
            query:(data)=>({
                url:`/chat/chat-rooms`,
                method:'POST',
                body:data
            }),
            invalidatesTags: ['Chat']
        })
        

    })
})

export const {useGetUserRoomMutation,useCreateNewRoomMutation,useGetRoomByNameMutation, useGetAllMessagesMutation} = chatApi