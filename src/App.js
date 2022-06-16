import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import "./App.css";

import MainRoutes from "./routes";
import { loggedInUser } from "./services/services";
import { Row } from "react-bootstrap";
import SideMenuComponent from "./components/SideMenuComponent";
import Footer from "./components/Footer";
import { ChangeNavbarTheme } from "./Contexts/ReloadContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const [theme, setTheme] = useState("");

  return (
    <div className="app">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ChangeNavbarTheme.Provider value={{ theme, setTheme }}>
          <NavigationBar />

          {loggedInUser ? (
            <>
              <div className="p-4"></div>
              <div className="p-1"></div>

              <Row>
                <div
                  className="col-md-3"
                  style={{ backgroundColor: "#2c387e" }}
                >
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
        </ChangeNavbarTheme.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
