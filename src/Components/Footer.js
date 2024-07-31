import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "16px",
        backgroundColor: "rgba(0, 50, 133, 0.8)",
        color: "#FFFFFF",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2">
          U.S. DEPARTMENT OF TRANSPORTATION
          <br />
          Bureau of Transportation Statistics
          <br />
          1200 NEW JERSEY AVENUE, SE
          <br />
          WASHINGTON, DC 20590
          <br />
          800-853-1351
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="8px"
      >
        <IconButton
          href="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
          sx={{ color: "white" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
          sx={{ color: "white" }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          aria-label="Instagram"
          sx={{ color: "white" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
          sx={{ color: "white" }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </footer>
  );
};

export default Footer;
