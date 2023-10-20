import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import Index from "./index.js";
import Swipe from "./Swipe";
import Profile from "./Profile";
import Matches from "./Matches";
import Settings from "./Settings";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
      {
        path: "/settings",
        element: <Settings />
      }
    ],
  },
]);

export default router;