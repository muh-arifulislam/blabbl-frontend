import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/login/redirect&callback`,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    onRedirectCallback={onRedirectCallback}
  >
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </StrictMode>
  </Auth0Provider>
);
