import { mainApi } from "../main";

const lawyerApi = mainApi.injectEndpoints({
    endpoints: (build)=>({
        getLawyer: build.query({
            query:()=>({
                url:'/users/lawyer',
                method:'GET'
            }),
            providesTags:['Users']
        }),
        registerLawyer: build.mutation({
            query:(data)=>({
                url:'/users/lawyer',
                method:'POST',
                body:data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
        }),
        getSkills: build.query({
            query:()=>({
                url:'/skill/',
                method:'GET'
            }),
            providesTags:['Users']
        }),
        getLawyerSkills: build.query({
            query:()=>({
                url:'/skill/my-skills',
                method:'GET'
            }),
            providesTags:['Users']
        }),
        addSkill: build.mutation({
            query:(data)=>({
                url:'/skill/add-skills',
                method:'POST',
                body:{
                    skill_ids:data
                }
            }),
            invalidatesTags:['Users']
        }),
        filterLawyer: build.mutation({
            query:(data)=>({
                url:'/users/lawyer/filter-lawyers',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Users']
        }),
    })
})

export const { useGetLawyerQuery, useRegisterLawyerMutation, useGetSkillsQuery, useGetLawyerSkillsQuery, useAddSkillMutation, useFilterLawyerMutation} = lawyerApi