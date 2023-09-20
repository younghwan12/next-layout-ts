import qs from "query-string"
import appApi from "@/redux/appApi"
import { Code } from "../types"
// import { BoardResList } from "../types";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["codeMgt"],
})

const codeApi = appTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodeList: builder.query<Code, any>({
      query: (args) => ({
        url: `/be/api/codes?${qs.stringify(args)}`,
        method: "GET",
        keepUnusedDataFor: 30,
      }),
      providesTags: (result, error, arg) => [{ type: "codeMgt", id: 1 }],
    }),
    addCode: builder.mutation<Code, any>({
      query: (args) => ({
        url: `/be/api/codes`,
        method: "POST",
        body: args,
      }),
      invalidatesTags: () => [{ type: "codeMgt" }],
    }),
    modifyCode: builder.mutation<Code, any>({
      query: (args) => ({
        url: `/be/api/codes`,
        method: "PUT",
        body: args,
      }),
      invalidatesTags: () => [{ type: "codeMgt" }],
    }),
    deleteCode: builder.mutation<Code, any>({
      query: (args) => ({
        url: `/be/api/codes/${args.uid}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "codeMgt" }],
    }),
    multiDeleteCode: builder.mutation<Code, any>({
      query: (args) => ({
        url: `/be/api/codes`,
        method: "DELETE",
        body: args,
      }),
      invalidatesTags: () => [{ type: "codeMgt" }],
    }),
  }),
  overrideExisting: true,
})

export default codeApi
export const { useGetCodeListQuery, useLazyGetCodeListQuery } = codeApi
