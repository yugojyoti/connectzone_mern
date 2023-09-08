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
    deletePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/deletepost`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/editpost`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/getpost/${postId}`,
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetAllPostQuery,
  useLikeMutation,
  useAddcommentMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostQuery,
} = postApiSlice;
