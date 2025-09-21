import { DateTimeUtil } from "@app/shared/utils/date-time-utils";
import type { ITicket } from "@app/types";
import { TableCell, TableRow } from "@mui/material";

interface IRowItemProps {
  data: ITicket;
}

const RowItem = ({ data }: IRowItemProps) => {
  return (
    <TableRow key={data.id}>
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>{data.createdBy}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.createdDate)}</TableCell>
      <TableCell>{DateTimeUtil.formatWithTZ(data.updatedDate)}</TableCell>
    </TableRow>
  );
};

export default RowItem;
