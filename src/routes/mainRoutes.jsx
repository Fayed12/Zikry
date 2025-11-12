// react router
import { createBrowserRouter } from "react-router";

// react
import { lazy, Suspense } from "react";

// local
import ErrorPage from "../pages/error/errorPage";
import ProtectedRoutes from "./protectedRoutes";
import Loading from "../pages/loading/loading";

// Lazy imports
const AppLazy = lazy(() => import("../App"));
const HomeLazy = lazy(() => import("../pages/home/home"));
const ContactLazy = lazy(() => import("../pages/contact/contact"));
const SupplicationsLazy = lazy(() =>
  import("../pages/supplication/supplications")
);
const FavoriteLazy = lazy(() => import("../pages/favorite/favorite"));
const SignUpLazy = lazy(() => import("../pages/signup/signUp"));
const LoginLazy = lazy(() => import("../pages/login/login"));
const ForgotPasswordLazy = lazy(() =>
  import("../pages/forgot-password/forgotPassword")
);
const RosaryLazy = lazy(() => import("../pages/rosary/rosary"));
const AboutLazy = lazy(() => import("../pages/about/about"));

// Helper to wrap lazy components with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>{Component}</Suspense>
);

const router = createBrowserRouter([
  {
    element: withSuspense(<AppLazy />),
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { element: withSuspense(<HomeLazy />), index: true },
      { element: withSuspense(<HomeLazy />), path: "home" },
      { element: withSuspense(<AboutLazy />), path: "about" },
      {
        element: (
          <ProtectedRoutes>
            {withSuspense(<SupplicationsLazy />)}
          </ProtectedRoutes>
        ),
        path: "supplications",
      },
      {
        element: (
          <ProtectedRoutes>{withSuspense(<RosaryLazy />)}</ProtectedRoutes>
        ),
        path: "rosary",
      },
      {
        element: (
          <ProtectedRoutes>{withSuspense(<FavoriteLazy />)}</ProtectedRoutes>
        ),
        path: "favorite",
      },
      { element: withSuspense(<ContactLazy />), path: "contactUs" },
    ],
  },
  {
    element: withSuspense(<SignUpLazy />),
    path: "/signUp",
    errorElement: <ErrorPage />,
  },
  {
    element: withSuspense(<LoginLazy />),
    path: "/login",
    errorElement: <ErrorPage />,
  },
  {
    element: withSuspense(<ForgotPasswordLazy />),
    path: "/forgotPassword",
    errorElement: <ErrorPage />,
  },
]);

export default router;
