import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-xl font-semibold text-blue-600 animate-pulse">
              Loading...
            </span>
          </div>
        </div>
        ;
      </>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default AuthProtected;
