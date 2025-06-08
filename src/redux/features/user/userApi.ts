import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipient: builder.query({
      query: (id) => ({
        url: `/users/${id}/recipient`,
        method: "GET",
      }),
    }),

    searchUsers: builder.query({
      query: (searchTerm: string) => ({
        url: `/users/search?searchTerm=${searchTerm}`,
        method: "GET",
      }),
    }),

    syncUser: builder.mutation({
      query: (userData) => ({
        url: `/users/sync`,
        method: "POST",
        body: userData,
      }),
    }),

    fetchUserFriendRequests: builder.query({
      query: () => ({
        url: `/users/user-friend-requests`,
        method: "GET",
      }),
      providesTags: ["user-friend-requests"],
    }),

    fetchFriends: builder.query({
      query: () => ({
        url: `/users/friends`,
        method: "GET",
      }),
      providesTags: ["friends"],
    }),

    unfriend: builder.mutation({
      query: (friendAuth0Id: string) => ({
        url: `/users/${friendAuth0Id}/unfriend`,
        method: "POST",
      }),
      invalidatesTags: ["friends", "user-friend-requests"],
    }),

    sendFriendRequest: builder.mutation({
      query: (receiverAuth0Id: string) => ({
        url: `/users/${receiverAuth0Id}/sent-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    cancelFriendRequest: builder.mutation({
      query: (receiverAuth0Id: string) => ({
        url: `/users/${receiverAuth0Id}/cancel-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    acceptFriendRequest: builder.mutation({
      query: (senderAuth0Id: string) => ({
        url: `/users/${senderAuth0Id}/accept-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    deleteFriendRequest: builder.mutation({
      query: (senderAuth0Id: string) => ({
        url: `/users/${senderAuth0Id}/delete-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),
  }),
});

export const {
  useGetRecipientQuery,
  useSearchUsersQuery,
  useSyncUserMutation,
  useSendFriendRequestMutation,
  useFetchUserFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useCancelFriendRequestMutation,
  useFetchFriendsQuery,
  useUnfriendMutation,
} = userApi;
