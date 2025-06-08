import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SearchAutocomplete } from "./SearchAutoComplete";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useFetchUserFriendRequestsQuery,
} from "@/redux/features/user/userApi";
import { IUser } from "@/types/user";

const AddFriendDialog = () => {
  const [tab, setTab] = useState<"incoming" | "sent">("incoming");

  const { data } = useFetchUserFriendRequestsQuery(undefined);

  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const handleCancelFriendRequest = async (receiverId: string) => {
    try {
      await cancelFriendRequest(receiverId);
    } catch (err) {
      console.log(err);
    }
  };

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const handleAcceptFriendRequest = async (senderId: string) => {
    try {
      await acceptFriendRequest(senderId);
    } catch (err) {
      console.log(err);
    }
  };

  const [deleteFriendRequest] = useDeleteFriendRequestMutation();
  const handleDeleteFriendRequest = async (senderId: string) => {
    try {
      await deleteFriendRequest(senderId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
          >
            <PlusIcon />
            <span className="sr-only">Inbox</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Add Friend</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="search" className="block mb-2">
                Search people
              </Label>
              {/* <div className="flex gap-2 relative">
                <Input
                  id="search"
                  placeholder="Enter username or email"
                  className="flex-1"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    // fetchSuggestions(e.target.value);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setShowSuggestions(false)}
                />
                <Button type="button" variant="default">
                  Search
                </Button>
               
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-10 left-0 top-full mt-1 w-full bg-popover border rounded shadow">
                    {suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 hover:bg-muted cursor-pointer"
                        // onMouseDown={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}
              <SearchAutocomplete />
            </div>

            {/* incoming and sent requests  */}
            <div>
              <div>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <button
                    type="button"
                    className={`font-semibold px-2 py-1 rounded cursor-pointer ${
                      tab === "incoming"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setTab("incoming")}
                  >
                    Incoming Requests
                  </button>
                  <button
                    type="button"
                    className={`font-semibold px-2 py-1 rounded  cursor-pointer ${
                      tab === "sent"
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setTab("sent")}
                  >
                    Sent Requests
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {tab === "incoming" ? (
                    // Incoming Requests List
                    <>
                      {/* {incomingRequests.length > 0 ? incomingRequests.map(req => ( */}
                      {data?.data?.received?.map((req: IUser) => (
                        <div
                          key={req._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              className="w-12 h-12 rounded-full"
                              src={
                                req?.picture ??
                                "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                              }
                              alt="avatar"
                            />
                            <h2 className="font-semibold">{req?.name}</h2>
                          </div>
                          <div className="space-x-3">
                            <Button
                              onClick={() =>
                                handleAcceptFriendRequest(req.auth0_id)
                              }
                              size="sm"
                              variant="default"
                            >
                              Confirm
                            </Button>
                            <Button
                              onClick={() =>
                                handleDeleteFriendRequest(req.auth0_id)
                              }
                              size="sm"
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      {/* )) : (
                    <div className="text-sm text-muted-foreground">No incoming requests.</div>
                    )} */}
                    </>
                  ) : (
                    // Sent Requests List
                    <>
                      {/* {sentRequests.length > 0 ? sentRequests.map(req => ( */}
                      {data?.data?.sent?.map((req: IUser) => (
                        <div
                          key={req._id}
                          className="flex flex-col sm:flex-row items-center justify-between w-full bg-slate-200 p-3 rounded-md gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              className="w-12 h-12 rounded-full"
                              src={
                                req?.picture ??
                                "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                              }
                              alt="avatar"
                            />
                            <h2 className="font-semibold">{req?.name}</h2>
                          </div>
                          <div className="space-x-3">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleCancelFriendRequest(req.auth0_id)
                              }
                            >
                              Cancel
                            </Button>
                            <Button size="sm" variant="default" disabled>
                              Request Sent
                            </Button>
                          </div>
                        </div>
                      ))}
                      {/* )) : (
                    <div className="text-sm text-muted-foreground">No sent requests.</div>
                    )} */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddFriendDialog;
