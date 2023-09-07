import { apiSlice } from "./apiSlice";
import { POSTS_URL } from "../../constants";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/addpost`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: `${POSTS_URL}/getallposts`,
      }),
      providesTags: ["Post"],
    }),
    like: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    addcomment: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/addcomment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetAllPostQuery,
  useLikeMutation,
  useAddcommentMutation,
} = postApiSlice;
