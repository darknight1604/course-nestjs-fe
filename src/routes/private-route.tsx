import { authAtom } from "@app/shared/atoms/auth-atom";
import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const auth = useAtomValue(authAtom);
  if (!auth || !auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
