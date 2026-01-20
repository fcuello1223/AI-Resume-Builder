import { Outlet } from "react-router-dom";

import Navbar from "../components/shared/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
