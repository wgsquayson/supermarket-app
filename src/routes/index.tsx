import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import PurchaseForm from "./purchase/form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/purchases/new",
    element: <PurchaseForm />,
  },
]);
