import React from "react";
import BackToTop from "react-back-to-top-button";
import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { ArrowUpward } from "@mui/icons-material";

export default function BackToTopComponent() {
  return (
    <BackToTop showOnScrollUp showAt={1000} speed={200} easing="easeInOutQuint">
      <IconButton
        sx={{
          backgroundColor: red[500],
          color: "white",
          ":hover": { backgroundColor: red[700] },
        }}
      >
        <ArrowUpward />
      </IconButton>
    </BackToTop>
  );
}
