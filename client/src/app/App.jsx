import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ThemeWrapper from "../components/ThemeWrapper";
import { ThemeProvider } from "../context/ThemeContext";
export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <RouterProvider router={router} />
      </ThemeWrapper>
    </ThemeProvider>
  );
}
