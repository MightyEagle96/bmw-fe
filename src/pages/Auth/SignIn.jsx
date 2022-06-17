import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import TextInputComponent from "../../components/TextInputComponent";
import { authenitcateFacebook, httpService } from "../../services/services";
import { PrimaryButton } from "../../components/MyButtons";
import MyGutterBottom from "../../components/MyGutterBottom";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const defaultData = { email: "", password: "" };
  const [account, setAccount] = useState(defaultData);

  const Login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const path = "login";
      const res = await httpService.post(path, account);
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
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleFailure = (result) => {
    console.error(result);
  };
  const handleLogin = (googleData) => {
    console.log(googleData);
    localStorage.setItem("googleData", googleData);
  };

  const responseFacebook = async (response) => {
    console.log(response);

    localStorage.setItem("facebookData", JSON.stringify(response));

    const path = "facebookAccount";

    await httpService.post(path, response);
  };

  return (
    <div>
      <Container>
        <div className="p-4 d-none d-md-block">
          <MyGutterBottom />
          <div className="d-flex justify-content-center">
            <div className=" ">
              <div className="">
                <div>
                  <Typography
                    variant="body1"
                    color="GrayText"
                    textAlign={"center"}
                  >
                    Sign in to your bwm-naija account
                  </Typography>
                </div>
                <div className=" mt-3">
                  <form onSubmit={Login}>
                    <TextInputComponent
                      label={"Email Address"}
                      name="email"
                      handleChange={handleChange}
                      value={account.email}
                      required={true}
                    />
                    <TextInputComponent
                      label={"Password"}
                      name="password"
                      type="password"
                      handleChange={handleChange}
                      value={account.password}
                      required={true}
                    />
                    <PrimaryButton
                      label={"Sign in"}
                      fullWidth={true}
                      type={"submit"}
                      loading={loading}
                    />
                  </form>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <GoogleLogin
                          onSuccess={handleLogin}
                          onError={handleFailure}
                        ></GoogleLogin>
                      </div>
                      <div>
                        <FacebookLogin
                          appId={process.env.REACT_APP_FACEBOOK_ID}
                          autoLoad={false}
                          fields="name,email,picture"
                          // onClick={componentClicked}
                          callback={responseFacebook}
                        ></FacebookLogin>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-sm-block d-md-none pt-4 pb-4">
          <MyGutterBottom />
          <div className="">
            <div>
              <Typography variant="body1" color="GrayText" textAlign={"center"}>
                Sign in to your bwm-naija account
              </Typography>
            </div>
            <div className=" mt-3">
              <form onSubmit={Login}>
                <TextInputComponent
                  label={"Email Address"}
                  name="email"
                  handleChange={handleChange}
                  value={account.email}
                />
                <TextInputComponent
                  label={"Password"}
                  name="password"
                  type="password"
                  handleChange={handleChange}
                  value={account.password}
                />
                <PrimaryButton
                  label={"Sign in"}
                  fullWidth={true}
                  type={"submit"}
                  loading={loading}
                />
              </form>
            </div>
            <div className="mt-3">
              <div className="d-none d-sm-block">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <GoogleLogin
                      onSuccess={handleLogin}
                      onError={handleFailure}
                    ></GoogleLogin>
                  </div>
                  <div>
                    <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_ID}
                      autoLoad={false}
                      fields="name,email,picture"
                      // onClick={componentClicked}
                      callback={responseFacebook}
                    ></FacebookLogin>
                  </div>
                </div>
              </div>
              <div className="d-xs-block d-sm-none">
                <div className="d-flex justify-content-center">
                  <Stack spacing={2}>
                    <div className="d-flex justify-content-center">
                      <GoogleLogin
                        onSuccess={handleLogin}
                        onError={handleFailure}
                      ></GoogleLogin>
                    </div>
                    <div className="d-flex justify-content-center">
                      <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={responseFacebook}
                      ></FacebookLogin>
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
