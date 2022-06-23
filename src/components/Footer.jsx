import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer p-5  ">
      <div>
        <Container>
          <Typography fontWeight={700} color="GrayText" className="text-center">
            BMW-NAIJA
          </Typography>
          <div className="d-flex justify-content-center">
            <Stack direction={"row"} spacing={2}>
              <Facebook sx={{ color: "#4e4e4e" }} />
              <Twitter sx={{ color: "#4e4e4e" }} />
              <Instagram sx={{ color: "#4e4e4e" }} />
            </Stack>
          </div>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <div className="col-md-3 text-center">
                <Stack>
                  <Typography variant="subtitle2">About us</Typography>
                  <Typography variant="subtitle2">Contact us</Typography>
                </Stack>
              </div>
              <div className="col-md-3 text-center">
                <Stack>
                  <Typography variant="subtitle2">
                    Terms and Conditions
                  </Typography>
                  <Typography variant="subtitle2">Support</Typography>
                </Stack>
              </div>
              <div className="col-md-3 text-center">
                <Stack>
                  <Typography variant="subtitle2">Abuja</Typography>
                  <Typography variant="subtitle2">Nigeria</Typography>
                </Stack>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
