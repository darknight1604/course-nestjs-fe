import { routePaths } from "@app/config/route-paths";
import AdminLayout from "@app/shared/ui/layout";
import { Route, Routes } from "react-router";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  LogoutPage,
  NotFoundPage,
  TicketPage,
  UserPage,
} from "@app/pages";
import PrivateRoute from "./private-route";

const Routers = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} path="/" />
      <Route path={routePaths.login.name} element={<LoginPage />} />
      <Route path={routePaths.admin.name} element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={routePaths.ticket.name} element={<TicketPage />} />
          <Route path={routePaths.user.name} element={<UserPage />} />
          <Route path={routePaths.logout.name} element={<LogoutPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routers;
