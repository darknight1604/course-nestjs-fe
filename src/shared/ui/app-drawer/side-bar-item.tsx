import { authAtom } from "@app/shared/atoms";
import type { ListItemData } from "@app/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { Link } from "react-router";

interface ISideBarItemProps {
  data: ListItemData;
  toggleDrawer: () => void;
}

const SideBarItem = ({ data, toggleDrawer }: ISideBarItemProps) => {
  const authData = useAtomValue(authAtom);

  const canDo = useMemo(() => {
    if (!authData || !authData.roles || authData.roles.length === 0) {
      return false;
    }
    if (data.requiredRoles.length === 0) {
      return true;
    }
    return data.requiredRoles.some((requiredRole) =>
      authData.roles?.includes(requiredRole)
    );
  }, [authData, data.requiredRoles]);

  return (
    <ListItem key={data.name} disablePadding>
      <ListItemButton
        component={Link}
        to={data.path}
        disabled={!canDo}
        onClick={toggleDrawer}
      >
        <ListItemIcon>{data.icon}</ListItemIcon>
        <ListItemText primary={data.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
