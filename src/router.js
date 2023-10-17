import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import Index from "./index.js";
import Match from "./Match"


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
    ],
  },
]);

export default router;