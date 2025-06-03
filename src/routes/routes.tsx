import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import ChatWindow from "@/components/Chat/ChatWindow";
import AuthProtected from "@/middlewares/AuthProtected";
import LoginPage from "@/pages/login";
import AuthCallback from "@/auth/AuthCallback";
import NoChatSelected from "@/components/ui/NoChatSelected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProtected>
        <App />
      </AuthProtected>
    ),
    children: [
      {
        index: true,
        element: <NoChatSelected />,
      },

      {
        path: "messages",
        element: <NoChatSelected />,
      },
      {
        path: "messages/:id",
        element: <ChatWindow />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/redirect&callback",
    element: <AuthCallback />,
  },
]);

export default router;
