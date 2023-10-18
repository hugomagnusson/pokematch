import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import Index from "./index.js";
import Match from "./Match"
import Profile from "./Profile"

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
        path: "/match",
        element: <Match />,
      },
      {
        path: "/profile/:uuid",
        element: <Profile />,
      },
    ],
  },
]);

export default router;