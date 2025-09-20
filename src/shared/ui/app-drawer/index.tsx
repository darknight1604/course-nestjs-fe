import { buildPath, routePaths } from "@app/config/route-paths";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useMemo } from "react";
import SideBarItem from "./side-bar-item";
import type { ListItemData } from "@app/types";

interface IAppDrawerProps {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
  width?: number;
}

const AppDrawer = ({ isOpen, handleOpen, width = 240 }: IAppDrawerProps) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    handleOpen(newOpen);
  };

  const listItemDatas: ListItemData[] = useMemo(() => {
    return [
      {
        name: "Ticket",
        path: buildPath([routePaths.admin.path, routePaths.ticket.path]),
        icon: <AssignmentOutlinedIcon />,
      },
      {
        name: "User",
        path: buildPath([routePaths.admin.path, routePaths.user.path]),
        icon: <Person4OutlinedIcon />,
      },
    ];
  }, []);

  return (
    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: width }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {listItemDatas.map((data) => (
            <SideBarItem data={data} />
          ))}
        </List>
        {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      </Box>
    </Drawer>
  );
};
export default AppDrawer;
