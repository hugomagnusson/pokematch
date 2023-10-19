import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import Index from "./index.js";
import Swipe from "./Swipe";
import Profile from "./Profile";
import Matches from "./Matches";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/swipe",
        element: <Swipe />,
      },
      {
        path: "/profile/:uuid",
        element: <Profile />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
    ],
  },
]);

export default router;