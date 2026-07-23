import React from "react";
import ReactDOM from "react-dom/client";
import Page from "./page";
import "./globals.css";

// Declare font variables on :root to match layout.tsx Google Font variables
const style = document.createElement("style");
style.innerHTML = `
  :root {
    --font-sans: "Lexend", "Noto Sans TC", sans-serif;
    --font-serif: "Lexend", "Noto Sans TC", sans-serif;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
