import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/mainRoutes.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          position: "relative",
          zIndex:"1001",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>
);
