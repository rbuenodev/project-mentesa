import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Sessions from "../pages/Sessions";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
