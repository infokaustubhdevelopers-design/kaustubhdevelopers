import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProjectDetail from "./pages/ProjectDetail";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  </BrowserRouter>
);
