import React from "react";
import ReactDOM from "react-dom/client";
import { PATHS } from "./paths";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CafeHomepage } from "./screens/Home";
import { LoginPage } from "./screens/LoginPage";
import { ErrorPage } from "./screens/ErrorPage";
import Menu from "./screens/Menu";
import AdminLayout from "./screens/Admin/AdminLayout";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminEmployees from "./screens/Admin/AdminEmployees";
import AdminSalary from "./screens/Admin/AdminSalary";
import AdminCashflow from "./screens/Admin/AdminCashflow";

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <CafeHomepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATHS.menu,
    element: <Menu />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATHS.login,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATHS.adminDashboard,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "employees", 
        element: <AdminEmployees />,
      },
      {
        path: "salary", // /admin/salary
        element: <AdminSalary />,
      },
      {
        path: "cashflow", // /admin/cashflow
        element: <AdminCashflow />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const Index = (): React.JSX.Element => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Index />,
);
