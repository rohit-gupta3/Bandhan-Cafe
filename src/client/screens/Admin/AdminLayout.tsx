import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { PATHS } from "../../paths";
import "./Admin.css";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const adminLinks = [
    { path: PATHS.adminDashboard, label: "Dashboard" },
    { path: PATHS.adminEmployees, label: "Employees" },
    { path: PATHS.adminSalary, label: "Salary" },
    { path: PATHS.adminCashflow, label: "Cashflow" },
  ];

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-content">
          <Link to={PATHS.adminDashboard} className="admin-logo">
            Bandhan Cafe Admin
          </Link>
          <nav className="admin-nav">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`admin-nav-link ${
                  location.pathname === link.path ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to={PATHS.login} className="admin-back-link">
            ← Back to Home (Logout)
          </Link>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
