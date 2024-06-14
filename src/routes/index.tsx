import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import NewProduct from "./product/new";
import NewPurchase from "./purchase/new";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/new",
    element: <NewProduct />,
  },
  {
    path: "/purchases/new",
    element: <NewPurchase />,
  },
]);
