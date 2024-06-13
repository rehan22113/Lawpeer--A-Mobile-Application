import { mainApi } from "../main";

const clientApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getClient: build.query({
            query:()=>({
                url:'/users/client',
                method:'GET'
            })
        }),
        registerClient: build.mutation({
            query:(clientdata)=>{
                return ({
                    url:'/users/client',
                    method:'POST',
                    body:clientdata,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                })
            }
            }),
        
    })
})

export const { useGetClientQuery, useRegisterClientMutation} = clientApi