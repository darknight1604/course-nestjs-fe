import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { ITicket } from "@app/types";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

interface IRowItemProps {
  index: number;
  data: ITicket;
  onView?: (data: ITicket) => void;
  onDelete?: (data: ITicket) => void;
  onEdit?: (data: ITicket) => void;
}

const RowItem = ({ data, onView, onDelete, onEdit, index }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>{data.createdBy}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.createdDate)}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.updatedDate)}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="view"
          color="primary"
          onClick={() => onView?.(data)}
        >
          <Visibility />
        </IconButton>
        <IconButton
          aria-label="edit"
          color="secondary"
          onClick={() => onEdit?.(data)}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => onDelete?.(data)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RowItem;
