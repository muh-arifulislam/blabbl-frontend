import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const syncUserWithBackend = async () => {
  //     const alreadySynced = localStorage.getItem("user_synced");
  //     if (!isAuthenticated || !user || alreadySynced === user?.sub) return;

  //     const token = await getAccessTokenSilently();

  //     const userDetailsByIdUrl = `https://${
  //       import.meta.env.VITE_AUTH0_DOMAIN
  //     }/api/v2/users/${user?.sub}`;

  //     const metadataResponse = await fetch(userDetailsByIdUrl, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const resData = await metadataResponse.json();

  //     const result = await fetch("http://localhost:5000/api/users/sync", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         auth0_id: user.sub,
  //         name: resData.name,
  //         email: resData.email,
  //         picture: resData.picture,
  //       }),
  //     });

  //     const data = await result.json();
  //     console.log(data);
  //     if (data.success) {
  //       localStorage.setItem("user_synced", user?.sub ?? "");
  //     }
  //   };

  //   if (!isLoading && isAuthenticated) {
  //     syncUserWithBackend();
  //   }
  // }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return <>loading..</>;
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default AuthProtected;
