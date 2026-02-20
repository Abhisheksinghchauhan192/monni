import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Overview from "../features/dashboard/Overview";
import Monthly from "../features/dashboard/Monthly";
import Yearly from "../features/dashboard/Yearly";

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
    ],
  },
  {
    path: "app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "monthly",
        element: <Monthly />,
      },
      {
        path: "yearly",
        element: <Yearly />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
