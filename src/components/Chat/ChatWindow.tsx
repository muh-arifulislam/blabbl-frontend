import { Mic, Paperclip } from "lucide-react";
import { SiteHeader } from "../site-header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SidebarInset } from "../ui/sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import socket from "@/lib/socket";
import UserMessage from "./UserMessage";
import RecipientMessage from "./RecipientMessage";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentAuthOId,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetUserMessagesQuery } from "@/redux/features/message/messageApi";
import { useGetRecipientQuery } from "@/redux/features/user/userApi";
import { TMessage } from "@/types";
import NotConnectedMessage from "../NotConnectedMessage";
import ChatWindowHeaderLoader from "../Loader/ChatWindowHeaderLoader";
import useRequestHelper from "@/hooks/useRequestHelper";
import ChatContentLoader from "../Loader/ChatContentLoader";

const ChatWindow = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();
  const userId = useAppSelector(selectCurrentAuthOId);
  const user = useAppSelector(selectCurrentUser);
  const recipientId = "google-oauth2|".concat(id ?? "");

  const { data: recipient, isLoading } = useGetRecipientQuery(recipientId);

  const { data: chatHistory } = useGetUserMessagesQuery({
    from: userId as string,
    to: recipientId,
  });

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    socket.emit("join", userId);

    if (chatHistory?.data?.length > 0) setMessages(chatHistory.data);

    socket.on("receive-message", (message) => {
      if (message.from === recipientId || message.to === recipientId) {
        setMessages((prev) => [...prev, message]);
        // showNotification(message);
        // playNotification();
      }
    });

    socket.on("typing", ({ from }) => {
      if (from === recipientId) setIsRecipientTyping(true);
    });

    socket.on("stop-typing", ({ from }) => {
      if (from === recipientId) setIsRecipientTyping(false);
    });

    socket.on("message-delivered", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, delivered: true } : msg
        )
      );
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
      socket.off("stop-typing");
      socket.off("message-delivered");
    };
  }, [userId, recipientId, chatHistory]);

  // const showNotification = (message: { from: string; content: string }) => {
  //   if (document.hidden && Notification.permission === "granted") {
  //     new Notification(`New message from ${message.from}`, {
  //       body: message.content,
  //     });
  //   }
  // };

  //pop alert when a new message is received
  // const playNotification = () => {
  //   const audio = new Audio("/message-pop-alert.mp3");
  //   audio.play().catch(() => {});
  // };

  const sendMessage = () => {
    if (!input.trim() || !userId || !recipientId) return; // Prevent sending empty messages or if IDs are missing

    const msg = {
      from: userId,
      to: recipientId,
      content: input,
      createdAt: new Date().toDateString(),
    };
    socket.emit("send-message", msg);
    setMessages((prev) => [...prev, msg]);
    setInput("");
    socket.emit("stop-typing", { from: userId, to: recipientId });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { from: userId, to: recipientId });
    }

    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("stop-typing", { from: userId, to: recipientId });
        setTyping(false);
      }, 1500)
    );
  };

  const hasAutoScrolled = useRef(false);

  const { friendsIds, isLoading: friendsIsLoading } = useRequestHelper();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unreadIds = messages
      .filter((msg) => msg.from === recipientId && !msg.read)
      .map((msg) => msg._id);

    if (unreadIds.length > 0) {
      socket.emit("mark-as-read", { messageIds: unreadIds });

      setMessages((prev) =>
        prev.map((msg) =>
          unreadIds.includes(msg._id) ? { ...msg, read: true } : msg
        )
      );
    }
  }, [messages, recipientId]);

  useLayoutEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length && !hasAutoScrolled.current) {
      // Wait for DOM render
      requestAnimationFrame(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "auto" });
        hasAutoScrolled.current = true;
      });
    }
  }, [messages]);

  return (
    <>
      <div>
        {isLoading ? (
          <>
            <ChatWindowHeaderLoader />
          </>
        ) : (
          <SiteHeader recipient={recipient?.data} />
        )}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <SidebarInset className="flex flex-col w-full">
          {/* Main Chat Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Content - scrollable */}
            <main className="flex-1 overflow-y-auto p-4 space-y-8 bg-gray-50">
              {isLoading || friendsIsLoading ? (
                <ChatContentLoader />
              ) : (
                <>
                  {friendsIds.includes(recipient?.data?._id) &&
                    messages.map((msg, i) =>
                      msg.from === userId ? (
                        <UserMessage
                          key={i}
                          data={msg}
                          picture={user?.picture ?? ""}
                        />
                      ) : (
                        <RecipientMessage
                          key={i}
                          name={recipient?.data?.name ?? "Recipient"}
                          data={msg}
                          picture={
                            recipient?.data?.picture ??
                            "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                          }
                        />
                      )
                    )}
                  <div>
                    {!friendsIds.includes(recipient?.data?._id) &&
                    recipient?.data ? (
                      <NotConnectedMessage recipient={recipient?.data} />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
              {/* Render Messages End Here */}
              {isRecipientTyping && <p>Typing...</p>}
              <div ref={messageEndRef} />
            </main>

            {/* Bottom Bar - fixed at bottom */}
            <div className="h-16 border-t border-gray-200 flex items-center px-4 bg-white gap-2 shrink-0">
              <Input
                disabled={!friendsIds.includes(recipient?.data?._id)}
                value={input}
                onChange={handleTyping}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) sendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Mic absoluteStrokeWidth />
              <Paperclip absoluteStrokeWidth />
              <Button
                disabled={!friendsIds.includes(recipient?.data?._id)}
                onClick={sendMessage}
              >
                Send
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </>
  );
};

export default ChatWindow;
