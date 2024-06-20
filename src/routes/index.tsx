import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import PurchaseForm from "./purchase/form";
import { PurchaseProvider } from "./purchase/context";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/purchases/new",
    element: (
      <PurchaseProvider>
        <PurchaseForm />
      </PurchaseProvider>
    ),
  },
]);
