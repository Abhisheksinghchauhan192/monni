import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ThemeWrapper from "../components/ThemeWrapper";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import { Analytics } from "@vercel/analytics/react";
import { SettingsProvider } from "../context/SettingsContext";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeWrapper>
          <ToastProvider>
            <AuthProvider>
              <SettingsProvider>
                <RouterProvider router={router} />
              </SettingsProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeWrapper>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
