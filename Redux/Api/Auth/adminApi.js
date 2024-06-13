import { mainApi } from "../main";

const adminApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getAllAdmin: build.query({
            query:()=>({
                url:'/admin',
                method:'GET'
            })
        }),
        getSingleAdmin: build.query({
            query:(id)=>({
                url:`/admin/${id}`,
                method:'GET'
            })
        }),
        registerAdmin: build.mutation({
            query:(data)=>({
                url:'/admin',
                method:'POST',
                body:data
            })
        }),
        deleteAdmin: build.mutation({
            query:(id)=>({
                url:`/admin/${id}`,
                method:'DELETE'
            })
        }),
        updateAdmin: build.mutation({
            query:(id,data)=>({
                url:`/admin/${id}`,
                method:'PUT',
                body:data
            })
        }),
        loginAdmin: build.mutation({
            query:(data)=>({
                url:'/admin/login',
                method:'POST',
                body:data
            })
        }),
    })
})

export const {useGetAllAdminQuery,useGetSingleAdminQuery,useRegisterAdminMutation,useUpdateAdminMutation,useDeleteAdminMutation,useLoginAdminMutation} = adminApi