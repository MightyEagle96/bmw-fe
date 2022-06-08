import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import vendorLogo from "../../assets/images/bmw-vendor.jpg";
import "./CreateVendor.css";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { redirectTo } from "../../utils/specialFunctions";
import { advertLabel } from "../../utils/labels";
import { httpService } from "../../services/services";

export default function CreateVendor() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleNext = () => {
    if (activeStep === 0 || activeStep === 1) {
      const keys = Object.keys(values);

      const theValues = Object.values(values);

      for (let i = 0; i < theValues.length; i++) {
        if (!theValues[i]) {
          setErrorState({ ...errorState, [keys[i]]: true });
        }
      }
    }

    if (Object.values(errorState).filter((c) => c === true).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else return;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (event) => {
    setErrorState({ ...errorState, [event.target.name]: false });
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const path = "createAccount";

      const res = await httpService.post(path, values);
      if (res) {
        setLoading(false);
        redirectTo("validateAccount");
      } else setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const contact = () => {
    return (
      <div>
        <div className="mb-3">
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            helperText="Your name as a vendor"
            style={{ width: 250 }}
            error={errorState.name}
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            helperText="Your email address"
            style={{ width: 250 }}
            error={errorState.email}
            onChange={handleChange}
            value={values.email}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="number"
            variant="outlined"
            helperText="Your phone number"
            style={{ width: 250 }}
            error={errorState.phoneNumber}
            onChange={handleChange}
            value={values.phoneNumber}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <FormControl sx={{ m: 0, width: 250 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={errorState.password}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </div>
    );
  };

  const storeDetails = () => {
    return (
      <div>
        <div className="mb-3">
          <TextField
            label="Store Name"
            helperText="Name of your store"
            name="storeName"
            value={values.storeName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Address"
            multiline
            maxRows={4}
            variant="outlined"
            helperText="Address of your store"
            name="address"
            value={values.address}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  const summary = () => {
    return (
      <div>
        <div className="mb-2">
          <Typography variant="subtitle2">Name:</Typography>
          <Typography variant="h6">{values.name}</Typography>
        </div>
        <div className="mb-2">
          <Typography variant="subtitle2">Email:</Typography>
          <Typography variant="h6">{values.email}</Typography>
        </div>
        <div className="mb-2">
          <Typography variant="subtitle2">Phone Number:</Typography>
          <Typography variant="h6">{values.phoneNumber}</Typography>
        </div>
        <div className="mb-2">
          <Typography variant="subtitle2">Store Name:</Typography>
          <Typography variant="h6">{values.storeName}</Typography>
        </div>
        <div className="mb-2">
          <Typography variant="subtitle2">Store Address:</Typography>
          <Typography variant="h6">{values.address}</Typography>
        </div>
      </div>
    );
  };
  const steps = [
    {
      label: "Name, Email and Phone",
      description: contact(),
    },
    {
      label: "BMW Store Description",
      description: storeDetails(),
    },
    {
      label: "Review and Submit",
      description: summary(),
    },
  ];

  return (
    <div>
      <div className="vendor pt-5 pb-5">
        <Container className="p-4 bg-white rounded-3 shadow-lg">
          <div
            className="h2 mb-4 mt-2 text-center"
            style={{
              fontWeight: 600,
              // textDecoration: "underline",
              color: "GrayText",
            }}
          >
            BECOME A BMW-NAIJA VENDOR
          </div>

          <div className="row p-3">
            <div className="col-lg-6 border-end">
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={
                                index === steps.length - 1
                                  ? submitForm
                                  : handleNext
                              }
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                            {loading ? (
                              <Button sx={{ mt: 1, mr: 1 }}>
                                <Spinner animation="border"></Spinner>
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
              <div className="alert alert-info mt-3 d-lg-none">
                <Typography variant="subtitle2">{advertLabel}</Typography>
              </div>
            </div>
            <div className="col-lg-6  d-flex align-items-center ">
              <div className="d-none d-md-block">
                <img
                  src={vendorLogo}
                  alt="Vendor logo"
                  className="img-fluid shadow-lg rounded-3"
                />
                <div className="alert alert-info mt-3">
                  <Typography variant="subtitle2">{advertLabel}</Typography>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
