import React, { useState } from "react";
import { Loader } from "../../components/Loader";
import { DashboardStats } from "../../../types";

const YEARS = [2026, "All"];
const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    totalBeverageExpenses: 0,
    totalPayout: 0,
    totalRoomRevenue: 0,
  });

  const [loading, setLoading] = useState(false);

  const [selectedYear, setSelectedYear] = useState(String(YEARS[0]));
  const [selectedMonth, setSelectedMonth] = useState("1");

  const fetchStats = async (year?: string, month?: string) => {
    setLoading(true);
    try {
      let url = "/api/admin/dashboard/stats";
      const params = new URLSearchParams();
      if (year) params.append("year", year);
      if (month) params.append("month", month);
      const query = params.toString();
      if (query) url += `?${query}`;

      const response = await fetch(url);
      const data = (await response.json()) as DashboardStats;

      setStats({
        totalRevenue: data.totalRevenue || 0,
        totalExpenses: data.totalExpenses || 0,
        totalBeverageExpenses: data.totalBeverageExpenses || 0,
        totalPayout: data.totalPayout || 0,
        totalRoomRevenue: data.totalRoomRevenue || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(selectedYear, selectedMonth || undefined);
  };

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Overview of your business</p>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Year</label>
              <select
                className="admin-form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {YEARS.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Month</label>
              <select
                className="admin-form-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-actions">
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
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
