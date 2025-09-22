import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { ITeam } from "@app/types";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";

interface IRowItemProps {
  index: number;
  data: ITeam;
  onDelete?: (data: ITeam) => void;
  onEdit?: (data: ITeam) => void;
}

const RowItem = ({ data, onDelete, onEdit, index }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.name}</TableCell>
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
