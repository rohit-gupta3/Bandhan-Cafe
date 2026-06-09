import React, { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { DashboardStats } from "../../../types";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalSalary: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    totalBeverageExpenses: 0,
    totalPayout: 0,
    totalRoomRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard/stats")
      .then((response) => response.json() as Promise<DashboardStats>)
      .then((data) => {
        setStats({
          totalSalary: 0,
          totalRevenue: data.totalRevenue || 0,
          totalExpenses: data.totalExpenses || 0,
          totalBeverageExpenses: data.totalBeverageExpenses || 0,
          totalPayout: data.totalPayout || 0,
          totalRoomRevenue: data.totalRoomRevenue || 0,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Overview of your business</p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-value">
                ₹{(stats.totalRevenue || 0).toLocaleString()}
              </div>
              <p className="admin-stat-label">Total Revenue</p>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-value">
                ₹{(stats.totalExpenses || 0).toLocaleString()}
              </div>
              <p className="admin-stat-label">Total Expenses</p>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-value">
                ₹{(stats.totalBeverageExpenses || 0).toLocaleString()}
              </div>
              <p className="admin-stat-label">Beverage Expenses</p>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-value">
                ₹{(stats.totalRoomRevenue || 0).toLocaleString()}
              </div>
              <p className="admin-stat-label">Room Revenue</p>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-value">
                ₹{(stats.totalPayout || 0).toLocaleString()}
              </div>
              <p className="admin-stat-label">Total Payout</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
