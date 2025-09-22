import { ROW_PER_PAGE, ROW_PER_PAGE_OPTION } from "@app/config/contants";
import { modalContentAtom, modalOpenAtom } from "@app/shared/atoms";
import ConfirmationModalChild from "@app/shared/ui/confirmation-modal-child";
import EmptySearchingData from "@app/shared/ui/empty-searching-data";
import type { ITicket } from "@app/types";
import {
  Button,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import useFetchTicket from "../../hooks";
import RowItem from "./row-item";
import { styles } from "./styles";
import TableHeader from "./table-header";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CreateTicketForm } from "../create-form";

const TableData = () => {
  const { loading, data, currentQuery, fetchData, deleteTicket, createTicket } =
    useFetchTicket();
  const setOpen = useSetAtom(modalOpenAtom);
  const setContent = useSetAtom(modalContentAtom);

  const tableProps = useMemo(() => {
    return {
      page: (currentQuery?.page || 1) - 1 || 0,
      count: data?.total || 0,
      rowsPerPage: currentQuery?.limit || ROW_PER_PAGE,
    };
  }, [currentQuery?.limit, currentQuery?.page, data?.total]);

  const onPageChange = useCallback(
    (_event: React.MouseEvent | null, page: number) => {
      const currentPage = currentQuery?.page || 1;
      let nextPage = 1;
      if (page >= currentPage) {
        nextPage = currentPage + 1;
      } else {
        nextPage = currentPage - 1;
      }
      const newQuery = { ...currentQuery, page: nextPage };
      fetchData(newQuery);
    },
    [currentQuery, fetchData]
  );

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = parseInt(event.target.value, 10);
    const newQuery = { ...currentQuery, limit: newValue, page: 1 };
    fetchData(newQuery);
  };

  const handleDeleteTicket = (ticket: ITicket) => {
    setContent(
      <ConfirmationModalChild
        title="Confirmation"
        message="Are you sure to do this?"
        onCancel={() => setOpen(false)}
        confirmBtnColor="error"
        onConfirm={() => {
          deleteTicket(ticket.id || 0);
          setOpen(false);
        }}
      />
    );
    setOpen(true);
  };

  const handleCreateTicket = () => {
    setContent(
      <CreateTicketForm
        onSubmit={(values) => {
          createTicket(values);
          setOpen(false);
        }}
      />
    );
    setOpen(true);
  };

  const handleEditTicket = (ticket: ITicket) => {
    setContent(
      <CreateTicketForm
        ticketId={ticket.id}
        onSubmit={() => {
          setOpen(false);
          fetchData(currentQuery || {});
        }}
      />
    );
    setOpen(true);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <Stack direction="row" justifyContent="flex-start" spacing={1}>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={handleCreateTicket}
        >
          CREATE
        </Button>
      </Stack>
      {data?.total === 0 ? (
        <EmptySearchingData />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={styles.container} aria-label="simple table">
            <TableHeader />
            <TableBody>
              {data?.data.map((row, index) => (
                <RowItem
                  index={index}
                  data={row}
                  key={row.id}
                  onDelete={handleDeleteTicket}
                  onEdit={handleEditTicket}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={ROW_PER_PAGE_OPTION}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  {...tableProps}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableData;
