import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/home";
import ErrorPage from "../pages/error/errorPage";
import Contact from "../pages/contact/contact";
import Supplications from "../pages/supplication/supplications";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Home />,
        path: "home",
      },
      {
        element: <Contact />,
        path: "contactUs",
      },
      {
        element: <Supplications />,
        path: "supplications",
      },
    ],
  },
]);

export default router;