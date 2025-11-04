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
        element: <Supplications />,
        path: "supplications",
      },
      {
        element: <Favorite />,
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
    errorElement:<ErrorPage/>
  },
  {
    element: <Login />,
    path: "/login",
    errorElement:<ErrorPage/>
  },
]);

export default router;