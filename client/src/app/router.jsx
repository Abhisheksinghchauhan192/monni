import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ProtectedRoute from "../routes/ProtectedRoute";
import NotFound from "../pages/NotFound";
import { lazy } from "react";

// lazy imports ..
const Overview = lazy(() => import("../features/dashboard/pages/Overview"));
const Budget = lazy(() => import("../features/budget/Budget"));
const Profile = lazy(() => import("../features/profile/Profile"));
const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword"),
);
const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword"),
);

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
