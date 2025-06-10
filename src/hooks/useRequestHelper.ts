import {
  useFetchFriendsQuery,
  useFetchUserFriendRequestsQuery,
} from "@/redux/features/user/userApi";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";

const useRequestHelper = () => {
  // Fetch user friend requests to check if the request has already been sent
  const [sentRequestsIds, setSentRequestsIds] = useState<string[]>([]);
  const [receivedRequestsIds, setReceivedRequestsIds] = useState<string[]>([]);
  const [friendsIds, setFriendsIds] = useState<string[]>([]);

  const { data: userFriendRequestsData, isLoading } =
    useFetchUserFriendRequestsQuery(undefined);

  const { data: userFriends } = useFetchFriendsQuery(undefined);

  useEffect(() => {
    if (userFriendRequestsData?.success) {
      const idsArrayOfSentRequests = userFriendRequestsData?.data?.sent?.map(
        (item: IUser) => item._id
      );

      const idsArrayofReceivedRequests =
        userFriendRequestsData?.data?.received?.map((item: IUser) => item._id);

      setSentRequestsIds(idsArrayOfSentRequests);
      setReceivedRequestsIds(idsArrayofReceivedRequests);
    }
    if (userFriends?.success && userFriends?.data?.length > 0) {
      const friendsIds = userFriends.data.map((friend: IUser) => friend._id);
      setFriendsIds(friendsIds);
    }
  }, [userFriendRequestsData, userFriends]);

  return { sentRequestsIds, receivedRequestsIds, friendsIds, isLoading };
};

export default useRequestHelper;
