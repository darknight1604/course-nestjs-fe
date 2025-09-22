import { buildPath, routePaths } from "@app/config/route-paths";
import type { ListItemData } from "@app/types";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useMemo } from "react";
import SideBarItem from "./side-bar-item";

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
        requiredRoles: ["ADMIN", "SUPER_ADMIN"],
      },
      {
        name: "User",
        path: buildPath([routePaths.admin.path, routePaths.user.path]),
        icon: <Person4OutlinedIcon />,
        requiredRoles: ["SUPER_ADMIN"],
      },
      {
        name: "Team",
        path: buildPath([routePaths.admin.path, routePaths.team.path]),
        icon: <Person4OutlinedIcon />,
        requiredRoles: ["ADMIN", "SUPER_ADMIN"],
      },
    ];
  }, []);

  const listItemDatasBelow: ListItemData[] = useMemo(() => {
    return [
      {
        name: "Logout",
        path: buildPath([routePaths.admin.path, routePaths.logout.path]),
        icon: <ExitToAppOutlinedIcon />,
        requiredRoles: [],
      },
    ];
  }, []);

  return (
    <Drawer open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: width,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <List sx={{ flex: 1, overflowY: "auto" }}>
          {listItemDatas.map((data) => (
            <SideBarItem
              data={data}
              key={data.path}
              toggleDrawer={toggleDrawer(false)}
            />
          ))}
        </List>
        <Divider />
        <List>
          {listItemDatasBelow.map((data) => (
            <SideBarItem
              data={data}
              key={data.path}
              toggleDrawer={toggleDrawer(false)}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default AppDrawer;
