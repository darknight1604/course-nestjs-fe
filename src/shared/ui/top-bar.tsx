import type { VoidCallback } from "@app/types";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface ITopBarProps {
  marginWidth: number;
  toggleDrawer: VoidCallback;
}

const TopBar = ({ marginWidth, toggleDrawer }: ITopBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${marginWidth}px)`,
        ml: `${marginWidth}px`,
        transition: "200ms",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="start"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
