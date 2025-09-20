import { Route, Routes } from "react-router";
import { AboutPage, DashboardPage, HomePage, LoginPage } from "../pages";
import PrivateRoute from "./private-route";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} path="/" />
      <Route path="login" element={<LoginPage />} />

      <Route path="admin" element={<PrivateRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
