import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/nabars/PublicNavigationBar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen  bg-white dark:bg-gray-900 ">
      <PublicNavbar/>
      <Outlet />
    </div>
  );
}
