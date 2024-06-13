import { mainApi } from "../main";

const userApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getAllUser: build.query({
            query:()=>({
                url:'/users',
                method:'GET',
                
            })
        }),
        getSingleUserByJwt:build.query({
            query:()=>({
                url:'/users/my-account',
                method:'GET',
                
            }),
            providesTags:['Users']
        }),
       getSingleUser: build.mutation({
        query:(id)=>({
            url:`/users/${id}`,
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
              },
        }),
        providesTags:['Users']
        
       }),
       loginUser: build.mutation({
        query:(data)=>({
            url:'/users/login',
            method:'POST',
            body:data
            })
        }),
        updateImage:build.mutation({
            query:({data,id})=>({
                url:`/users/update-profile-image/${id}`,
                method:'POST',
                body:data,
                headers: {
                    // Set Content-Type to multipart/form-data for file upload
                    'Content-Type': 'multipart/form-data',
                  },
                }),
                invalidatesTags:['Users']
            }),
        updateUserRecord:build.mutation({
            query:({data,id})=>({
                url:`/users/${id}`,
                method:'PUT',
                body:data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }),
                invalidatesTags:['Users']
            }),
        changePassword:build.mutation({
            query:(data)=>({
                url:`/users/change-password/${data.id}`,
                method:'POST',
                body:data
            })
        }),
        forgetPasswordOtp: build.mutation({
            query:(data)=>({
                url:"/users/forgot-password-otp",
                method:'POST',
                body:data
            })
        }),
        ResetPassword:build.mutation({
            query:(data)=>({
                url:"/users/reset-password",
                method:'POST',
                body:data
            })
        }),
        removeAccount:build.mutation({
            query:({userData:data,id})=>({
                url:`/users/de-activate/${id}`,
                method:'POST',
                body:data
            })
        }),
        GenerateEmailOtp: build.mutation({
            query:(data)=>({
                url:"/users/verify-email-otp",
                method:'POST',
                body:data
            })
        }),
        VerifyEmail: build.mutation({
            query:(data)=>({
                url:"/users/verify-email",
                method:'POST',
                body:data
            })
        }),
        deleteUser: build.mutation({
            query:(id)=>({
                url:`/users/${id}`,
                method:'DELETE'
            })
        }),
        
    }),
    
    })

export const { useGetAllUserQuery, useGetSingleUserMutation, useLoginUserMutation, useDeleteUserMutation, useRemoveAccountMutation , useUpdateUserRecordMutation, useUpdateImageMutation, useForgetPasswordOtpMutation, useChangePasswordMutation , useResetPasswordMutation, useGenerateEmailOtpMutation, useVerifyEmailMutation, useGetSingleUserByJwtQuery} = userApi