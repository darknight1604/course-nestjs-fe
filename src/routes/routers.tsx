import { Route, Routes } from "react-router";
import { AboutPage, DashboardPage, HomePage, LoginPage } from "../pages";
import PrivateRoute from "./private-route";
import { routePaths } from "@app/config/route-paths";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} path="/" />
      <Route path={routePaths.login.name} element={<LoginPage />} />

      <Route path={routePaths.admin.name} element={<PrivateRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
