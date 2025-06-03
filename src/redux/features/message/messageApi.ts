import { baseApi } from "@/redux/api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMessages: builder.query({
      query: ({ from, to }: { from: string; to: string }) => ({
        url: `/messages/${from}/${to}`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
  }),
});

export const { useGetUserMessagesQuery } = messageApi;
