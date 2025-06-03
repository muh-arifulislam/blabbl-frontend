import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipient: builder.query({
      query: (id) => ({
        url: `/users/${id}/recipient`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRecipientQuery } = userApi;
