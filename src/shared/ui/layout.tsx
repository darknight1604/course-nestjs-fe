import AppDrawer from "@app/shared/ui/app-drawer";
import { Box, Toolbar } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import TopBar from "./top-bar";
import { Outlet } from "react-router";

const baseDrawerWidth = 240;

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const marginWidth = useMemo(() => {
    if (drawerOpen) {
      return baseDrawerWidth;
    }
    return 0;
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar toggleDrawer={toggleDrawer} marginWidth={marginWidth} />

      <AppDrawer
        isOpen={drawerOpen}
        handleOpen={setDrawerOpen}
        width={baseDrawerWidth}
      />

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${marginWidth}px)`,
          ml: `${marginWidth}px`,
          transition: "200ms",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
