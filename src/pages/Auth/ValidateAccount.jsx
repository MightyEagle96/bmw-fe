import { Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { PrimaryButton } from "../../components/MyButtons";
import { httpService } from "../../services/services";

import "./ValidateAccount.css";
export default function ValidateAccount() {
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const validateAccount = async () => {
    try {
      setLoading(true);
      const path = "verifyAccount";

      const res = await httpService.post(path, { otp });
      if (res) {
        localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.accessToken);
        localStorage.setItem(
          process.env.REACT_APP_PROJECT_NAME,
          JSON.stringify(res.data.user)
        );
        window.location.assign("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      <Container>
        <div className="d-none d-md-block p-5 shadow-lg">
          <Row>
            <div className="col-md-6 border-end d-flex align-items-center">
              <div>
                <Typography fontWeight={900} fontSize={30} color="GrayText">
                  Verify your BMW-Naija Account
                </Typography>
                <Typography color="GrayText">
                  Enter the OTP sent to your phone
                </Typography>
              </div>
            </div>
            <div className="col-md-6">
              <Stack>
                <div className="col-md-4">
                  <Stack spacing={1}>
                    <TextField
                      label="OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                    />
                    <PrimaryButton
                      label={"Verify"}
                      onClick={validateAccount}
                      loading={loading}
                    />
                  </Stack>
                </div>
              </Stack>
            </div>
          </Row>
        </div>
        <div className="d-sm-block d-md-none mt-5 mb-5">
          <div>
            <Typography fontWeight={900} fontSize={24} color="GrayText">
              Verify your BMW-Naija Account
            </Typography>
            <Typography color="GrayText">
              Enter the OTP sent to your phone
            </Typography>
          </div>
          <hr />
          <div>
            <Stack>
              <div className="col-md-3">
                <Stack spacing={1}>
                  <TextField
                    label="OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                  />
                  <PrimaryButton
                    label={"Verify"}
                    onClick={validateAccount}
                    loading={loading}
                  />
                </Stack>
              </div>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
}
