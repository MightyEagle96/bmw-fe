import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Routes";
import { loggedInUser } from "../services/services";
const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {loggedInUser
          ? privateRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))
          : publicRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
