import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer p-3 d-flex justify-content-center align-items-center">
      <div>
        <Typography fontWeight={700} color="GrayText" textAlign={"center"}>
          BMW-NAIJA
        </Typography>
        <div className="d-flex justify-content-center">
          <Stack direction={"row"} spacing={2}>
            <Facebook sx={{ color: "#4e4e4e" }} />
            <Twitter sx={{ color: "#4e4e4e" }} />
            <Instagram sx={{ color: "#4e4e4e" }} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
