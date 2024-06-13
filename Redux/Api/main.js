import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const mainApi = createApi({
    reducerPath:'lawpeerapi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userauth.token;
            // headers.set("Content-Type", "application/json");
            headers.set('Accept', 'application/json, application/xml, text/plain, text/html, *.*')
            // headers.set('Content-Type', 'multipart/form-data');
            // headers.set("Accept", "*/*");
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    tagTypes:['Chat','Contract','Users'],
    endpoints:(builder)=>({
        getTest:builder.mutation({
            query: (id)=>{
                return `/?${id}`
            }
        })
    })
})

export const {useGetTestMutation} = mainApi

