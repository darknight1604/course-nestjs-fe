import SearchForm from "@app/features/ticket/ui/search-form";
import TableData from "@app/features/ticket/ui/table-data";

const TicketPage = () => {
  return (
    <>
      <h1>Ticket</h1>
      <SearchForm />
      <TableData />
    </>
  );
};

export default TicketPage;
