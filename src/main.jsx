import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../src/components/common/ThemeContext.jsx"; // Import ThemeProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>{" "}
    {/* Tambahkan ThemeProvider disini */}
  </StrictMode>
);
