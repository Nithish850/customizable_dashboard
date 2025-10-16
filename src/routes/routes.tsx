import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import NewDashboard from "../pages/NewDashboardPage";
import DashboardPage from "../pages/DashboardPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/dashboard" element={<NewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
