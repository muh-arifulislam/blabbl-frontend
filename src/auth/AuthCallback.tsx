// src/auth/AuthCallback.tsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // ✅ Cache user
      localStorage.setItem("auth0Id", JSON.stringify(user.sub));

      // ✅ Redirect to original page if available
      const searchParams = new URLSearchParams(location.search);
      const returnTo = searchParams.get("returnTo") || "/";

      navigate(returnTo, { replace: true });
    }
  }, [isLoading, isAuthenticated, user, navigate, location.search]);

  return <div>Authenticating...</div>;
}
