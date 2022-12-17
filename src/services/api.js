// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RhToast } from "@rhythm-ui/react";

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["connections"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/login/",
        body,
      }),
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch(() => RhToast.error("Invalid Credentials!"));
      },
    }),

    patchUser: builder.mutation({
      query: (body) => ({
        method: "put",
        url: `/profile`,
        body,
      }),
      invalidatesTags: ["connections"],
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch((err) =>
          RhToast.error(err.error || "Failed to update user")
        );
      },
    }),

    getUsers: builder.query({
      query: (params) => ({
        method: "get",
        url: "/users",
        params,
      }),
      providesTags: ["connections"],
      transformResponse: (data) => {
        console.log(data, "all data");
        return data;
      },
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch(() =>
          RhToast.info("Login to see and add wishlist")
        );
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetUsersQuery, usePatchUserMutation } =
  mainApi;
