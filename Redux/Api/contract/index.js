import { mainApi } from "../main"

const contractApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getUserContract: build.query({
            query:()=>({
                url:`/contract/my-contracts`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        getUserContractData: build.mutation({
            query:()=>({
                url:`/contract/my-contracts`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        UserContractById: build.query({
            query:(id)=>({
                url:`/contract/${id}`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        getUserContractById: build.mutation({
            query:(id)=>({
                url:`/contract/user/${id}`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        AddNewContract:build.mutation({
            query:(data)=>({
                url:`/contract/`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Contract']
        }),
        endContract:build.mutation({
            query:({data,id})=>({
                url:`contract/end-contract/${id}`,
                method:'POST',
                body:{
                    ended_reason:data
                }
            }),
            invalidatesTags:['Contract']
        }),
        AddReview:build.mutation({
            query:(data)=>({
                url:`/review/`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Contract']
        }),
        getAllLawyerReview:build.query({
            query:(id)=>({
                url:`/review/lawyer/${id}`,
                method:'Get'
            }),
            providesTags:['Contract']
        }),
        getTransaction:build.mutation({
            query:()=>({
                url:`/transaction/my-transactions`,
                method:'Get'
            }),
            providesTags:['Contract']
        }),
        getTransactionData:build.query({
            query:()=>({
                url:`/transaction/my-transactions`,
                method:'Get'
            }),
            providesTags:['Contract']
        }),
        deleteContract:build.mutation({
            query:(id)=>({
                url:`/contract/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Contract']
        }),
        

    })
})

export const {useGetUserContractByIdMutation,useGetUserContractQuery, useGetUserContractDataMutation,useAddNewContractMutation,useUserContractByIdQuery, useGetTransactionMutation, useGetTransactionDataQuery, useEndContractMutation,useAddReviewMutation, useGetAllLawyerReviewQuery, useDeleteContractMutation } = contractApi