import { Mic, Paperclip } from "lucide-react";
import { SiteHeader } from "../site-header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SidebarInset } from "../ui/sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import UserMessage from "./UserMessage";
import RecipientMessage from "./RecipientMessage";

const ChatWindow = () => {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("auth0Id") ?? "");
  const recipientId = "google-oauth2|".concat(id ?? "");

  const [messages, setMessages] = useState<
    { from: string; to: string; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  console.log(isRecipientTyping);
  useEffect(() => {
    socket.emit("join", userId);

    socket.on("receive-message", (message) => {
      if (message.from === recipientId || message.to === recipientId) {
        setMessages((prev) => [...prev, message]);
        // showNotification(message);
        playNotification();
      }
    });

    socket.on("typing", ({ from }) => {
      if (from === recipientId) setIsRecipientTyping(true);
    });

    socket.on("stop-typing", ({ from }) => {
      if (from === recipientId) setIsRecipientTyping(false);
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [userId, recipientId]);

  // const showNotification = (message: { from: string; content: string }) => {
  //   if (document.hidden && Notification.permission === "granted") {
  //     new Notification(`New message from ${message.from}`, {
  //       body: message.content,
  //     });
  //   }
  // };

  //pop alert when a new message is received
  const playNotification = () => {
    const audio = new Audio("/message-pop-alert.mp3");
    audio.play().catch(() => {});
  };

  const sendMessage = () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const msg = { from: userId, to: recipientId, content: input };
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

  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission();
  //   }
  // }, []);

  return (
    <>
      <div>
        <SiteHeader />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <SidebarInset className="flex flex-col w-full">
          {/* Main Chat Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Content - scrollable */}
            <main className="flex-1 overflow-y-auto p-4 space-y-8 bg-gray-50">
              {/* Render Messages Here */}

              {messages.map((msg, i) =>
                msg.from === userId ? (
                  <UserMessage
                    key={i}
                    name="You"
                    avatar="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    time={"12:34 PM"}
                    content={msg.content}
                  />
                ) : (
                  <RecipientMessage
                    key={i}
                    name="Grace Miller"
                    avatar="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    time={"12:34 PM"}
                    content={msg.content}
                  />
                )
              )}

              {/* ...more messages... */}

              {/* {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.from === userId ? "text-right" : "text-left"}
                >
                  <p>{m.content}</p>
                </div>
              ))} */}
            </main>

            {/* Bottom Bar - fixed at bottom */}
            <div className="h-16 border-t border-gray-200 flex items-center px-4 bg-white gap-2 shrink-0">
              <Input
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
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </>
  );
};

export default ChatWindow;
