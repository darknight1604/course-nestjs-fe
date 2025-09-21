import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Roles</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Updated Date</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
