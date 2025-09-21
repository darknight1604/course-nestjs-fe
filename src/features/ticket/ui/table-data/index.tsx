import { ROW_PER_PAGE, ROW_PER_PAGE_OPTION } from "@app/config/contants";
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
import { useCallback, useMemo } from "react";
import useFetchTicket from "../../hooks";
import RowItem from "./row-item";
import TableHeader from "./table-header";
import { styles } from "./styles";
import EmptySearchingData from "@app/shared/ui/empty-searching-data";

const TableData = () => {
  const { loading, data, currentQuery, fetchData } = useFetchTicket();

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

  if (loading) {
    return <LinearProgress />;
  }

  if (data?.total === 0) {
    return <EmptySearchingData />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.container} aria-label="simple table">
        <TableHeader />
        <TableBody>
          {data?.data.map((row) => (
            <RowItem data={row} />
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
  );
};

export default TableData;
