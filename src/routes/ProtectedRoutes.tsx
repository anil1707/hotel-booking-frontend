import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {
  const location = useLocation();

  const {
    user,
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );

  // Not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/owner/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // User doesn't have required role
  if (
    allowedRoles &&
    !user.roles.some((role) =>
      allowedRoles.includes(role)
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;