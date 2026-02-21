import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ThemeWrapper from "../components/ThemeWrapper";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
