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

    sendFriendRequest: builder.mutation({
      query: (userAuth0Id: string) => ({
        url: `/users/${userAuth0Id}/sent-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
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

    acceptFriendRequest: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}/accept-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    deleteFriendRequest: builder.mutation({
      query: (userAuth0Id: string) => ({
        url: `/users/${userAuth0Id}/sent-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    cancelFriendRequest: builder.mutation({
      query: (userAuth0Id: string) => ({
        url: `/users/${userAuth0Id}/sent-friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["user-friend-requests"],
    }),

    unfriend: builder.mutation({
      query: (friendId: string) => ({
        url: `/users/${friendId}/unfriend`,
        method: "POST",
      }),
      invalidatesTags: ["friends", "user-friend-requests"],
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
