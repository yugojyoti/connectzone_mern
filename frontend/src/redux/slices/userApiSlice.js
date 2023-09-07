import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/getallusers`,
      }),
      providesTags: ["User"], // provides tags- that need to update after a mutation in done
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/followuser`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetAllUserQuery,
  useFollowUserMutation,
} = userApiSlice;
