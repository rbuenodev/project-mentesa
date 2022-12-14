
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default AuthRoutes;
