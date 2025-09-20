import { Link } from "react-router";
import AdminLayout from "@app/shared/ui/layout";

const DashboardPage = () => {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <Link to="/admin/about">About</Link>
    </AdminLayout>
  );
};

export default DashboardPage;
