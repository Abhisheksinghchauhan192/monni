import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ThemeWrapper from "../components/ThemeWrapper";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <ToastProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ToastProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
