import { UserPlus, Shield, X, UserCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import useRequestHelper from "@/hooks/useRequestHelper";
import { IUser } from "@/types/user";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useSendFriendRequestMutation,
} from "@/redux/features/user/userApi";

interface NotConnectedMessageProps {
  recipient: IUser;
}

export default function NotConnectedMessage({
  recipient,
}: NotConnectedMessageProps) {
  // Fetch user friend requests to check if the request has already been sent
  const { sentRequestsIds, receivedRequestsIds } = useRequestHelper();

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const handleSendFriendRequest = async (receiverAuth0Id: string) => {
    try {
      await sendFriendRequest(receiverAuth0Id);
    } catch (err) {
      console.log(err);
    }
  };

  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const handleCancelFriendRequest = async (receiverAuth0Id: string) => {
    try {
      await cancelFriendRequest(receiverAuth0Id);
    } catch (err) {
      console.log(err);
    }
  };

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const handleAcceptFriendRequest = async (senderAuth0Id: string) => {
    try {
      await acceptFriendRequest(senderAuth0Id);
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteFriendRequest] = useDeleteFriendRequestMutation();
  const handleDeleteFriendRequest = async (senderAuth0Id: string) => {
    try {
      await deleteFriendRequest(senderAuth0Id);
    } catch (err) {
      console.log(err);
    }
  };

  const isSent = (id: string) => {
    return sentRequestsIds.includes(id);
  };

  const isReceived = (id: string) => {
    return receivedRequestsIds.includes(id);
  };

  return (
    <div className="flex items-center justify-center h-full p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          {/* User Avatar */}
          <div className="flex justify-center">
            <img
              src={recipient?.picture || "/placeholder.svg"}
              alt={recipient?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Connect with {recipient?.name}
            </h3>
            <p className="text-sm text-gray-600">
              You need to be friends with {recipient?.name} to send messages.
              Send a friend request to start chatting!
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <Shield className="w-4 h-4" />
            <span>Your privacy is protected until you connect</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <Button className="w-full" size="lg">
              <UserPlus className="w-4 h-4 mr-2" />
              {true ? "Request Sent" : "Send Friend Request"}
            </Button> */}
            {isSent(recipient._id) ? (
              <Button
                onClick={() => handleCancelFriendRequest(recipient.auth0_id)}
                className="w-full"
                size="lg"
                variant="destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Friend Request
              </Button>
            ) : isReceived(recipient._id) ? (
              <div className="space-y-3">
                <Button
                  onClick={() => handleAcceptFriendRequest(recipient.auth0_id)}
                  size="lg"
                  variant="default"
                  className="w-full"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Accept Request
                </Button>
                <Button
                  onClick={() => handleDeleteFriendRequest(recipient.auth0_id)}
                  size="lg"
                  className="w-full"
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete Request
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => handleSendFriendRequest(recipient.auth0_id)}
                className="w-full"
                size="lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Send Friend Request
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500">
            Once {recipient?.name} accepts your request, you'll be able to chat
            freely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
