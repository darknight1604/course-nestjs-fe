import { Link } from "react-router";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/admin/about">About</Link>
    </div>
  );
};

export default DashboardPage;
