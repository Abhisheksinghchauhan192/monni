import { Navigate, Outlet } from "react-router-dom";
import PublicNavbar from "../components/nabars/PublicNavigationBar";
import { useAuth } from "../context/AuthContext";

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  return (
    <div className="min-h-screen  bg-white dark:bg-gray-900 ">
      <PublicNavbar />
      <Outlet />
    </div>
  );
}
