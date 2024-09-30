import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = process.env.NEXT_PUBLIC_URL;
console.log(url);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getTodo: build.query<Itodo[], void>({
      query: () => "",
      providesTags: ["Todo"],
    }),
    postTodo: build.mutation<Itodo, Itodo>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation<void, number>({
      query: (_id) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    editTodo: build.mutation<Itodo, { _id: number }>({
      query: ({ _id, ...rest }) => ({
        url: `/${_id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
export const {
  useGetTodoQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = api;
