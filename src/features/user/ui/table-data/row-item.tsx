import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { IUser } from "@app/types";
import { TableCell, TableRow, Chip, IconButton } from "@mui/material";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { styles } from "./styles";

interface IRowItemProps {
  index: number;
  data: IUser;
  onToggleActive?: (data: IUser) => void;
}

const RowItem = ({ data, index, onToggleActive }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.username}</TableCell>
      <TableCell>
        <Chip
          label={data.isActive ? "Active" : "Inactive"}
          color={data.isActive ? "success" : "error"}
          size="small"
          sx={styles.chipLabel}
        />
      </TableCell>
      <TableCell>{data.roles?.join(", ")}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.createdDate)}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.updatedDate)}</TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="toggle-active"
          color="primary"
          onClick={() => onToggleActive?.(data)}
        >
          <CachedOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RowItem;
