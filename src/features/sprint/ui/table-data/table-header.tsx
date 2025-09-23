import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Created By</TableCell>
        <TableCell>Team</TableCell>
        <TableCell>Start Date</TableCell>
        <TableCell>End Date</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Updated Date</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
