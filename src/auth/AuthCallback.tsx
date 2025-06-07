// src/auth/AuthCallback.tsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSyncUserMutation } from "@/redux/features/user/userApi";

export default function AuthCallback() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [handleSyncUser] = useSyncUserMutation();

  const getUserMetadata = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const userDetailsByIdUrl = `https://${
        import.meta.env.VITE_AUTH0_DOMAIN
      }/api/v2/users/${user?.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const resData = await metadataResponse.json();

      return { data: resData, accessToken };
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      if (!isLoading && isAuthenticated && user) {
        // ✅ Cache user

        const metadata = await getUserMetadata();
        if (!metadata) {
          // Handle error or return early if metadata is undefined
          return;
        }
        const { data, accessToken } = metadata;
        // ✅ Dispatch user data to Redux store
        if (data?.email) {
          dispatch(
            setUser({
              user: {
                name: data?.name,
                email: data?.email,
                picture: data?.picture,
              },
              token: accessToken,
              auth0_id: user.sub as string,
            })
          );

          await handleSyncUser({
            auth0_id: user.sub as string,
            name: data?.name,
            email: data?.email,
            picture: data?.picture,
          });
        }

        // ✅ Redirect to original page if available
        const searchParams = new URLSearchParams(location.search);
        const returnTo = searchParams.get("returnTo") || "/";

        navigate(returnTo, { replace: true });
      }
    };
    handleAuth();
  }, [isLoading, isAuthenticated, user, navigate, location.search]);

  return <div>Authenticating...</div>;
}
