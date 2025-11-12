// react
import { Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// react router
import { RouterProvider } from "react-router";

// toaster
import { Toaster } from "react-hot-toast";

// local
import "./index.css";
import router from "./routes/mainRoutes.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          position: "relative",
          zIndex: "1001",
        },
      }}
    />
      <RouterProvider router={router} />
  </StrictMode>
);
