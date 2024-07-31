import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RecordsIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <RecordsIcon />
          </ListItemIcon>
          <ListItemText primary="/" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 50, 133, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FMSCA
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            federal motor carrier safety administration
          </Typography>
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<RecordsIcon />}
            sx={{ color: "white", border: "none", padding: "8px 16px" }}
          >
            Records
          </Button>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
