// react router
import { createBrowserRouter } from "react-router";

// local
import App from "../App";
import Home from "../pages/home/home";
import ErrorPage from "../pages/error/errorPage";
import Contact from "../pages/contact/contact";
import Supplications from "../pages/supplication/supplications";
import Favorite from "../pages/favorite/favorite";
import SignUp from "../pages/signup/signUp";
import Login from "../pages/login/login";
import ForgotPassword from "../pages/forgot-password/forgotPassword";
import ProtectedRoutes from "./protectedRoutes";
import Rosary from "../pages/rosary/rosary";
import About from "../pages/about/about";

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
        element: <About />,
        path: "about",
      },
      {
        element: (
          <ProtectedRoutes>
            <Supplications />
          </ProtectedRoutes>
        ),
        path: "supplications",
      },
      {
        element: (
          <ProtectedRoutes>
            <Rosary />
          </ProtectedRoutes>
        ),
        path: "rosary",
      },
      {
        element: (
          <ProtectedRoutes>
            <Favorite />
          </ProtectedRoutes>
        ),
        path: "favorite",
      },
      {
        element: <Contact />,
        path: "contactUs",
      },
    ],
  },
  {
    element: <SignUp />,
    path: "/signUp",
    errorElement: <ErrorPage />,
  },
  {
    element: <Login />,
    path: "/login",
    errorElement: <ErrorPage />,
  },
  {
    element: <ForgotPassword />,
    path: "/forgotPassword",
    errorElement: <ErrorPage />,
  },
]);

export default router;