import type { ListItemData } from "@app/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router";

interface ISideBarItemProps {
  data: ListItemData;
}

const SideBarItem = ({ data }: ISideBarItemProps) => {
  return (
    <ListItem key={data.name} disablePadding>
      <ListItemButton component={Link} to={data.path}>
        <ListItemIcon>{data.icon}</ListItemIcon>
        <ListItemText primary={data.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
