import AppDrawer from "@app/shared/ui/app-drawer";
import { Box, Toolbar } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import TopBar from "./top-bar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const baseDrawerWidth = 240;

const AdminLayout = ({ children }: AdminLayoutProps) => {
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
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
