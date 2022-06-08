import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import React from "react";
import NavigationBar from "./components/NavigationBar";
import "./App.css";

import MainRoutes from "./routes";
import { loggedInUser } from "./services/services";
import { Row } from "react-bootstrap";
import SideMenuComponent from "./components/SideMenuComponent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <div className="p-4"></div>
      <div className="mt-2"></div>
      {loggedInUser ? (
        <>
          <Row>
            <div className="col-md-3" style={{ backgroundColor: "#2c387e" }}>
              <SideMenuComponent />
            </div>
            <div className="col-md-9 p-3">
              <MainRoutes />
            </div>
          </Row>
        </>
      ) : (
        <MainRoutes />
      )}
      <Footer />
    </div>
  );
}

export default App;
