import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { ISprint } from "@app/types";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";

interface IRowItemProps {
  index: number;
  data: ISprint;
  onDelete?: (data: ISprint) => void;
  onEdit?: (data: ISprint) => void;
}

const RowItem = ({ data, onDelete, onEdit, index }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.createdBy}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.createdDate)}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.updatedDate)}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="edit"
          color="primary"
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
