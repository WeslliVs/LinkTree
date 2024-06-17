import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { Admin } from "./pages/admin/Admin";
import { Login } from "./pages/login/Login";
import { Networks } from "./pages/networks/Sociais";
import { Private } from "./routes/Private";
import { Error404 } from "./pages/error/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export { router };
