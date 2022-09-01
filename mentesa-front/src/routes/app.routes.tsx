import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Sessions from "../pages/Sessions";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/patients" element={<Patients />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
