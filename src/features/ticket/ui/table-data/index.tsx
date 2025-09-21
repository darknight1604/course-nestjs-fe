import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import useFetchTicket from "../../hooks";
import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import { ROW_PER_PAGE, ROW_PER_PAGE_OPTION } from "@app/config/contants";
import { useMemo } from "react";

const TableData = () => {
  const { loading, data } = useFetchTicket();

  const tableProps = useMemo(() => {
    return { page: (data?.page || 1) - 1, count: data?.total || 0 };
  }, [data?.page, data?.total]);

  const onPageChange = (event: React.MouseEvent | null, page: number) => {
    console.log("on page change");
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Updated Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>
                {DateTimeUtil.formatWithTZ(row.createdDate)}
              </TableCell>
              <TableCell>
                {DateTimeUtil.formatWithTZ(row.updatedDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={ROW_PER_PAGE_OPTION}
              onPageChange={onPageChange}
              rowsPerPage={ROW_PER_PAGE}
              {...tableProps}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableData;
