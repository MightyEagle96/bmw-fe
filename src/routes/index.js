import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Routes";
// import { loggedInUser } from "../services/services";
import { useSelector } from "react-redux";
const MainRoutes = () => {
  const loggedUser = useSelector((state) => state.loggedUser);
  return (
    <BrowserRouter>
      <Routes>
        {loggedUser
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
