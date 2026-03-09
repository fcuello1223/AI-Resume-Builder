import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/shared/Navbar";
import Loader from "../components/shared/Loader";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
