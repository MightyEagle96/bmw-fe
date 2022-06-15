import React, { useContext, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { loggedInUser, handleLogout } from "../services/services";
import { Badge, Typography } from "@mui/material";
import { ChangeNavbarTheme } from "../Contexts/ReloadContext";
import { Login, Logout, Notifications } from "@mui/icons-material";
import brand from "../assets/images/brand.png";
import "./NavigationBar.css";

export default function NavigationBar() {
  const { theme } = useContext(ChangeNavbarTheme);
  const [navbar, setNavbar] = useState(false);

  const changeBg = () => {
    if (window.scrollY > 80) {
      setNavbar(true);
    } else setNavbar(false);
  };

  window.addEventListener("scroll", changeBg);
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
            {loggedInUser ? (
              <>
                <Nav.Link>
                  {/* <Badge color="error" badgeContent={adminNotifications}>
                    <Notifications />
                  </Badge> */}
                </Nav.Link>
                <Nav.Link>
                  <Typography>{loggedInUser.name.split(" ")[0]}</Typography>
                </Nav.Link>
                <Nav.Link component="button" onClick={handleLogout}>
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
