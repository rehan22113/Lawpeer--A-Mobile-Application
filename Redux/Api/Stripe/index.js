import { mainApi } from "../main"

const contractApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getStripePaymentIntent: build.mutation({
            query:(id)=>({
                url:`/contract/payment`,
                method:'POST',
                body:id
            }),
            invalidatesTags:['Contract']
        }),
        // getUserContractById: build.mutation({
        //     query:(id)=>({
        //         url:`/contract/user/${id}`,
        //         method:'GET',
        //     }),
        //     providesTags:['Contract']
        // }),
        // AddNewContract:build.mutation({
        //     query:(data)=>({
        //         url:`/contract/`,
        //         method:'POST',
        //         body:data
        //     }),
        //     invalidatesTags:['Contract']
        // }),
        // getRoomByName:build.mutation({
        //     query:(roomName)=>({
        //         url:`/chat/chat-rooms/${roomName}`,
        //         method:'GET',
        //     })
        // }),
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

export const { useGetStripePaymentIntentMutation} = contractApi