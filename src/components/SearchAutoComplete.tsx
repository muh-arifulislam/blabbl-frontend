// components/SearchAutocomplete.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useAcceptFriendRequestMutation,
  useFetchUserFriendRequestsQuery,
  useSearchUsersQuery,
  useSendFriendRequestMutation,
} from "@/redux/features/user/userApi";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentAuthOId } from "@/redux/features/auth/authSlice";

export function SearchAutocomplete() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  //   const [selected, setSelected] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const { data, isFetching, isError } = useSearchUsersQuery(input);

  const userAuth0Id = useAppSelector(selectCurrentAuthOId);

  const [sendFriendRequest] = useSendFriendRequestMutation();

  // Fetch user friend requests to check if the request has already been sent
  const [sentRequestsIds, setSentRequestsIds] = useState<string[]>([]);
  const [receivedRequestsIds, setReceivedRequestsIds] = useState<string[]>([]);

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const handleAcceptFriendRequest = async (senderId: string) => {
    try {
      await acceptFriendRequest(senderId);
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

  const { data: userFriendRequestsData } =
    useFetchUserFriendRequestsQuery(undefined);

  useEffect(() => {
    if (userFriendRequestsData?.success) {
      const idsArrayOfSentRequests = userFriendRequestsData?.data?.sent?.map(
        (item) => item._id
      );

      const idsArrayofReceivedRequests =
        userFriendRequestsData?.data?.received?.map((item) => item._id);

      setSentRequestsIds(idsArrayOfSentRequests);
      setReceivedRequestsIds(idsArrayofReceivedRequests);
    }
  }, [userFriendRequestsData]);

  const handleSendFriendRequest = async (userAuth0Id: string) => {
    try {
      await sendFriendRequest(userAuth0Id);
    } catch (err) {
      console.log(err);
    }
  };

  // Update suggestions when data changes
  useEffect(() => {
    if (isError) {
      setSuggestions([]);
    } else {
      const filteredData = data?.data?.filter(
        (item) => item?.auth0_id !== userAuth0Id
      );
      setSuggestions(filteredData);
    }
  }, [data, input, isError, isFetching]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10"
            onFocus={() => setOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        asChild
        className="p-0 w-xs md:w-xl z-[99999999999] !fixed  !left-1/2 !-translate-x-1/2"
        style={{ pointerEvents: "auto" }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {suggestions?.map(
                  (item: {
                    _id: string;
                    name: string;
                    picture?: string;
                    auth0_id: string;
                  }) => (
                    <CommandItem
                      className=""
                      key={item._id}
                      onSelect={() => {
                        //   setInput(item);
                        //   setSelected(item);
                        // setOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-12 h-12 rounded-full"
                            src={
                              item.picture ||
                              "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                            }
                            alt=""
                          />
                          <h2 className="font-semibold">{item.name}</h2>
                        </div>
                        <div className="space-x-3">
                          {isSent(item._id) ? (
                            <Button size="sm" variant="destructive">
                              Cancel
                            </Button>
                          ) : isReceived(item._id) ? (
                            <>
                              <Button
                                onClick={() =>
                                  handleAcceptFriendRequest(item._id)
                                }
                                size="sm"
                                variant="default"
                              >
                                Confirm
                              </Button>
                              <Button size="sm" variant="destructive">
                                Delete
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() =>
                                handleSendFriendRequest(item.auth0_id)
                              }
                              size="sm"
                              variant="default"
                            >
                              Add friend
                            </Button>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}

{
  /* <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10"
        onFocus={() => setOpen(true)}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        autoComplete="off"
      />
    </div>
  </PopoverTrigger>
  <PopoverContent
    asChild
    className="p-0 w-xl z-[99999999999] !fixed  !left-1/2 !-translate-x-1/2"
    style={{ pointerEvents: "auto" }}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filtered.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => {
                  //   setInput(item);
                  //   setSelected(item);
                  //   setOpen(false);
                }}
                className="cursor-pointer"
              >
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </PopoverContent>
</Popover>; */
}
