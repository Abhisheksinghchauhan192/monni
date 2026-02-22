import { Outlet } from "react-router-dom";
import AppNavigationBar from "../components/nabars/AppNavigationBar";
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <AppNavigationBar/>
      {/* PAGE CONTENT */}
      <div className="pt-8 px-6">
        <Outlet />
      </div>
    </div>
  );
}