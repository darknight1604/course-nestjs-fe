import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { IUser } from "@app/types";
import { TableCell, TableRow, Chip } from "@mui/material";

interface IRowItemProps {
  index: number;
  data: IUser;
}

const RowItem = ({ data, index }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{data.username}</TableCell>
      <TableCell>
        <Chip
          label={data.isActive ? "Active" : "Inactive"}
          color={data.isActive ? "success" : "error"}
          size="small"
        />
      </TableCell>
      <TableCell>{data.roles?.join(", ")}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.createdDate)}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.updatedDate)}</TableCell>
    </TableRow>
  );
};

export default RowItem;
