import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { ChangeNavbarTheme } from "../Contexts/ReloadContext";
import { Login, Logout } from "@mui/icons-material";
import brand from "../assets/images/brand.png";
import "./NavigationBar.css";
import { authenitcateFacebook, httpService } from "../services/services";
import { useSelector, useDispatch } from "react-redux";
import { authType, signIn } from "../redux/actions";

export default function NavigationBar() {
  const loggedUser = useSelector((state) => state.loggedUser);

  const auth_type = useSelector((state) => state.authType);
  const dispatch = useDispatch();
  const { theme } = useContext(ChangeNavbarTheme);
  const [navbar, setNavbar] = useState(false);

  const changeBg = () => {
    if (window.scrollY > 80) {
      setNavbar(true);
    } else setNavbar(false);
  };

  const logout = () => {
    dispatch(signIn(null));
    localStorage.removeItem("facebookData");
    localStorage.removeItem("googleData");
    localStorage.removeItem("jwtData");
    localStorage.removeItem(process.env.REACT_APP_PROJECT_NAME);
    window.location.assign("/login");
  };

  window.addEventListener("scroll", changeBg);
  // console.log(facebookUser);
  const getFacebookToken = async () => {
    const facebookUser = JSON.parse(localStorage.getItem("facebookData"));
    if (facebookUser) {
      const res = await authenitcateFacebook(facebookUser.accessToken);
      if (res) {
        dispatch(authType("fb"));
        dispatch(signIn(facebookUser));
      } else {
        dispatch(authType(""));
        dispatch(signIn(null));
        logout();
      }
    }
  };

  const getGoogeUser = async () => {
    const googleUser = JSON.parse(localStorage.getItem("googleData"));
    if (googleUser) {
      const path = "verifyGoogleCred";

      const res = await httpService.post(path, googleUser);
      if (res && res.data) {
        dispatch(authType("google"));
        dispatch(signIn(googleUser));
      } else {
        dispatch(authType(""));
        dispatch(signIn(null));
        logout();
      }
    }
  };

  const getJWTUser = () => {
    const jwtUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_PROJECT_NAME)
    );

    if (jwtUser) {
      dispatch(signIn(jwtUser));
      dispatch(authType("jwt"));
    } else {
      dispatch(authType(""));
      dispatch(signIn(null));
    }
  };

  useEffect(() => {
    getFacebookToken();
    getJWTUser();
    getGoogeUser();
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={navbar ? "navBar active" : "navbar"}
      variant={theme || "light"}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={brand} alt="brand" width="30" height="30" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {auth_type === "fb" || authType === "google" ? (
              <>
                {" "}
                <Nav.Link href="/ourProducts">Our Products</Nav.Link>
              </>
            ) : (
              <>
                {" "}
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/ourProducts">Our Products</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {loggedUser ? (
              <>
                <Nav.Link>
                  <Avatar
                    src={loggedUser.picture ? loggedUser.picture.data.url : ""}
                  />
                </Nav.Link>
                {auth_type === "google" || auth_type === "fb" ? (
                  <NavDropdown title={loggedUser.name.split(" ")[0]}>
                    <NavDropdown.Item href="/myOrders">
                      My Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>{loggedUser.name.split(" ")[0]}</Nav.Link>
                )}
                <Nav.Link component="button" onClick={logout}>
                  Logout
                  <span className="ms-1">
                    <Logout />
                  </span>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">
                Login
                <span className="ms-1">
                  <Login />
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
