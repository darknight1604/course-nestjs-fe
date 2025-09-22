import { ROW_PER_PAGE, ROW_PER_PAGE_OPTION } from "@app/config/contants";
import EmptySearchingData from "@app/shared/ui/empty-searching-data";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";
import useFetchUser from "../../hooks";
import RowItem from "./row-item";
import { styles } from "./styles";
import TableHeader from "./table-header";
import type { IUser } from "@app/types";
import { modalContentAtom, modalOpenAtom } from "@app/shared/atoms";
import { useSetAtom } from "jotai";
import ConfirmationModalChild from "@app/shared/ui/confirmation-modal-child";

const TableData = () => {
  const { loading, data, currentQuery, fetchData, toggleActive } =
    useFetchUser();
  const setOpen = useSetAtom(modalOpenAtom);
  const setContent = useSetAtom(modalContentAtom);

  const tableProps = useMemo(() => {
    return {
      page: (currentQuery?.page || 1) - 1 || 0,
      count: data?.total || 0,
      rowsPerPage: currentQuery?.limit || ROW_PER_PAGE,
    };
  }, [currentQuery?.limit, currentQuery?.page, data?.total]);

  const onPageChange = (_event: React.MouseEvent | null, page: number) => {
    const currentPage = currentQuery?.page || 1;
    const nextPage = page >= currentPage ? currentPage + 1 : currentPage - 1;
    const newQuery = { ...currentQuery, page: nextPage };
    fetchData(newQuery);
  };

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = parseInt(event.target.value, 10);
    const newQuery = { ...currentQuery, limit: newValue, page: 1 };
    fetchData(newQuery);
  };

  const handleOnTogleActive = (data: IUser) => {
    const newStatus = !(data.isActive || false);
    setContent(
      <ConfirmationModalChild
        title="Confirmation"
        message={`Are you sure to ${
          newStatus ? "Active" : "Inactive"
        } this User?`}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          toggleActive(data);
          setOpen(false);
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
      {data?.total === 0 ? (
        <EmptySearchingData />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={styles.container} aria-label="users table">
            <TableHeader />
            <TableBody>
              {data?.data.map((row, index) => (
                <RowItem
                  index={index}
                  data={row}
                  key={row.id}
                  onToggleActive={handleOnTogleActive}
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
