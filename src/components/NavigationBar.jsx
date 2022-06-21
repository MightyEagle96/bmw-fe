import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
// import { handleLogout } from "../services/services";
import { Avatar, Typography } from "@mui/material";
import { ChangeNavbarTheme } from "../Contexts/ReloadContext";
import { Login, Logout } from "@mui/icons-material";
import brand from "../assets/images/brand.png";
import "./NavigationBar.css";
import { authenitcateFacebook } from "../services/services";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/actions";

export default function NavigationBar() {
  const loggedUser = useSelector((state) => state.loggedUser);
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
    localStorage.removeItem(process.env.REACT_APP_PROJECT_NAME);
    window.location.assign("/login");
  };

  window.addEventListener("scroll", changeBg);
  // console.log(facebookUser);
  const getFacebookToken = async () => {
    const facebookUser = JSON.parse(localStorage.getItem("facebookData"));
    if (facebookUser) {
      const res = await authenitcateFacebook(facebookUser.accessToken);
      res ? dispatch(signIn(facebookUser)) : dispatch(signIn(null));
    }
  };

  const getJWTUser = () => {
    const jwtUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_PROJECT_NAME)
    );

    if (jwtUser) dispatch(signIn(jwtUser));
    else dispatch(signIn(null));
  };

  useEffect(() => {
    getFacebookToken();
    getJWTUser();
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ourProducts">Our Products</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedUser ? (
              <>
                <Nav.Link>
                  <Avatar
                    src={loggedUser.picture ? loggedUser.picture.data.url : ""}
                  />
                </Nav.Link>
                <Nav.Link>
                  <Typography>{loggedUser.name.split(" ")[0]}</Typography>
                </Nav.Link>
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
