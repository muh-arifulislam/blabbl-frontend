import { useEffect } from "react";
import socket from "@/lib/socket";
import { useAuth0 } from "@auth0/auth0-react";

export const useSocket = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      socket.emit("register", user.sub);
    }

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, user]);

  return socket;
};
