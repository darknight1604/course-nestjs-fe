import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Created By</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Updated Date</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
