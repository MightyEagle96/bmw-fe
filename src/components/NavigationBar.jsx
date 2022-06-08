import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { loggedInUser, handleLogout } from "../services/services";
import { Badge, Typography } from "@mui/material";
import { ReloadContext } from "../Contexts/ReloadContext";
import { Login, Logout, Notifications } from "@mui/icons-material";
import brand from "../assets/images/brand.png";

export default function NavigationBar() {
  const { adminNotifications } = useContext(ReloadContext);
  return (
    <Navbar expand="lg" fixed="top" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={brand} alt="brand" width="30" height="30" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ourProducts">Our Products</Nav.Link>
            {/* <NavDropdown title="Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="/createProduct">
                Create Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <>
                <Nav.Link>
                  <Badge color="error" badgeContent={adminNotifications}>
                    <Notifications />
                  </Badge>
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
