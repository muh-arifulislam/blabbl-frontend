import App from "@/App";
import Message from "@/components/message";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "messages",
        element: <Message />,
      },
    ],
  },
]);

export default router;
