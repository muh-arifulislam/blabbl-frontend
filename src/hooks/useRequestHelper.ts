import { useFetchUserFriendRequestsQuery } from "@/redux/features/user/userApi";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";

const useRequestHelper = () => {
  // Fetch user friend requests to check if the request has already been sent
  const [sentRequestsIds, setSentRequestsIds] = useState<string[]>([]);
  const [receivedRequestsIds, setReceivedRequestsIds] = useState<string[]>([]);

  const { data: userFriendRequestsData } =
    useFetchUserFriendRequestsQuery(undefined);

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
  }, [userFriendRequestsData]);

  return { sentRequestsIds, receivedRequestsIds };
};

export default useRequestHelper;
