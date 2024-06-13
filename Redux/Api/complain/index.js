import { mainApi } from "../main"

const complainApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getUserComplain: build.mutation({
            query:(id)=>({
                url:`/complaint/user/${id}`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        // getUserContractById: build.mutation({
        //     query:(id)=>({
        //         url:`/complaint/user/${id}`,
        //         method:'GET',
        //     }),
        //     providesTags:['Contract']
        // }),
        AddNewComplain:build.mutation({
            query:(data)=>({
                url:`/complaint/`,
                method:'POST',
                body:data
            })
        }),
        // getAllMessages: build.mutation({
        //     query:(room_id)=>({
        //         url:`/chat/room-messages/${room_id}`,
        //         method:'GET',
        //     })
        // }),
        // createNewRoom:build.mutation({
        //     query:(data)=>({
        //         url:`/chat/chat-rooms`,
        //         method:'POST',
        //         body:data
        //     }),
        //     invalidatesTags: ['Chat']
        // })
        

    })
})

export const {useAddNewComplainMutation,useGetUserComplainMutation} = complainApi