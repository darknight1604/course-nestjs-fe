import SearchForm from "@app/features/user/ui/search-form";
import TableData from "@app/features/user/ui/table-data";

const UserPage = () => {
  return (
    <>
      <h1>User</h1>
      <SearchForm />
      <TableData />
    </>
  );
};

export default UserPage;
