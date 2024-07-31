import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />
      <Navbar />
      <Box component="main" flexGrow={1} overflow="auto" paddingTop={10}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
