import { useEffect } from "react";
import { useLogout } from "../hooks";
import { useNavigate } from "react-router";
import { routePaths } from "@app/config/route-paths";

const Logout = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout(() => {
      navigate(routePaths.login.path, { replace: true });
    });
  }, [logout, navigate]);

  return <></>;
};

export default Logout;
