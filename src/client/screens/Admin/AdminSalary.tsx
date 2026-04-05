import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

interface SalaryRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  paymentDate: string | null;
  status: string;
  month: string;
}

const AdminSalary: React.FC = () => {
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSalary, setEditingSalary] = useState<SalaryRecord | null>(null);
  const [formData, setFormData] = useState({
    employeeId: 0,
    employeeName: "",
    baseSalary: 0,
    paymentDate: "",
    month: "",
  });

  useEffect(() => {
    // Fetch salaries from API
    fetch("/api/admin/salaries")
      .then((response) => response.json())
      .then((data) => {
        setSalaries(data.salaries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching salaries:", error);
        setLoading(false);
      });
  }, []);

  const calculateNetSalary = (
    base: number,
    bonus: number,
    deductions: number,
  ) => {
    return base + bonus - deductions;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSalary) {
        // Update existing salary
        const response = await fetch(
          `/api/admin/salaries/${editingSalary.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
        const data = await response.json();
        setSalaries(
          salaries.map((sal) =>
            sal.id === editingSalary.id ? data.salary : sal,
          ),
        );
      } else {
        // Create new salary
        const response = await fetch("/api/admin/salaries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setSalaries([...salaries, data.salary]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving salary:", error);
    }
  };

  const handleEdit = (salary: SalaryRecord) => {
    setEditingSalary(salary);
    setFormData({
      employeeId: salary.employeeId,
      employeeName: salary.employeeName,
      baseSalary: salary.baseSalary,
      paymentDate: salary.paymentDate || "",
      month: salary.month,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this salary record?")) {
      try {
        await fetch(`/api/admin/salaries/${id}`, {
          method: "DELETE",
        });
        setSalaries(salaries.filter((salary) => salary.id !== id));
      } catch (error) {
        console.error("Error deleting salary:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSalary(null);
    setFormData({
      employeeId: 0,
      employeeName: "",
      baseSalary: 0,
      paymentDate: "",
      month: "",
    });
  };

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Salary Management</h1>
        <p className="admin-page-subtitle">
          Manage employee salaries and payments
        </p>
      </div>

      {loading ? (
        <div className="admin-loading">
          <p>Loading salary data...</p>
        </div>
      ) : (
        <>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-value">{salaries.length}</div>
              <p className="admin-stat-label">Total Records</p>
            </div>
          </div>

          <div className="admin-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 className="admin-card-title" style={{ margin: 0 }}>
                Salary Records
              </h2>
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => setShowModal(true)}
              >
                Add Salary Record
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Month</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary) => (
                    <tr key={salary.id}>
                      <td>{salary.employeeName}</td>
                      <td>{salary.month}</td>
                      <td>₹{salary.baseSalary.toLocaleString()}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-action-btn admin-edit-btn"
                            onClick={() => handleEdit(salary)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-action-btn admin-delete-btn"
                            onClick={() => handleDelete(salary.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {salaries.length === 0 && (
              <div className="admin-empty-state">
                <p>
                  No salary records found. Add your first salary record to get
                  started.
                </p>
              </div>
            )}
          </div>

          {showModal && (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <div className="admin-modal-header">
                  <h2 className="admin-modal-title">
                    {editingSalary
                      ? "Edit Salary Record"
                      : "Add New Salary Record"}
                  </h2>
                  <button
                    className="admin-modal-close"
                    onClick={handleCloseModal}
                  >
                    ×
                  </button>
                </div>

                <div className="admin-modal-body">
                  <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">
                          Employee Name
                        </label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={formData.employeeName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employeeName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Month</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={formData.month}
                          onChange={(e) =>
                            setFormData({ ...formData, month: e.target.value })
                          }
                          placeholder="e.g., April 2024"
                          required
                        />
                      </div>
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">
                          Base Salary (₹)
                        </label>
                        <input
                          type="number"
                          className="admin-form-input"
                          value={formData.baseSalary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              baseSalary: Number(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Payment Date</label>
                        <input
                          type="date"
                          className="admin-form-input"
                          value={formData.paymentDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              paymentDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="admin-btn-group">
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                      >
                        {editingSalary ? "Update" : "Add"} Record
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminSalary;
