import React, { useState, useEffect } from "react";

interface CashflowItem {
  id: number;
  type: "revenue" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
  item?: string;
}

const AdminCashflow: React.FC = () => {
  const [cashflow, setCashflow] = useState<CashflowItem[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "revenue" | "expenses"
  >("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"revenue" | "expense">("revenue");
  const [editingItem, setEditingItem] = useState<CashflowItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    type: "revenue" as "revenue" | "expense",
    category: "",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
    vendor: "",
    item: "",
    quantity: 1,
  });

  useEffect(() => {
    // Fetch cashflow data from API
    fetch("/api/admin/cashflow")
      .then((response) => response.json())
      .then((data) => {
        setCashflow(data.cashflow);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cashflow:", error);
        setLoading(false);
      });
  }, []);

  const revenue = cashflow.filter((item) => item.type === "revenue");
  const expenses = cashflow.filter((item) => item.type === "expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // Update existing item
        const response = await fetch(`/api/admin/cashflow/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setCashflow(
          cashflow.map((item) =>
            item.id === editingItem.id ? data.entry : item,
          ),
        );
      } else {
        // Create new item
        const response = await fetch("/api/admin/cashflow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setCashflow([...cashflow, data.entry]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving cashflow item:", error);
    }
  };

  const handleEdit = (item: CashflowItem) => {
    setEditingItem(item);
    setModalType(item.type);
    setFormData({
      type: item.type,
      category: item.category,
      amount: item.amount,
      description: item.description,
      date: item.date,
      paymentMethod: item.paymentMethod,
      vendor: "",
      item: "",
      quantity: 1,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`/api/admin/cashflow/${id}`, {
          method: "DELETE",
        });
        setCashflow(cashflow.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting cashflow item:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      type: "revenue",
      category: "",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "cash",
      vendor: "",
      item: "",
      quantity: 1,
    });
  };

  const totalRevenue = cashflow
    .filter((item) => item.type === "revenue")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = cashflow
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const renderOverview = () => (
    <div>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            ₹{(totalRevenue || 0).toLocaleString()}
          </div>
          <p className="admin-stat-label">Total Revenue</p>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            ₹{(totalExpenses || 0).toLocaleString()}
          </div>
          <p className="admin-stat-label">Total Expenses</p>
        </div>
        <div className={`admin-stat-card ${netProfit >= 0 ? "" : ""}`}>
          <div className="admin-stat-value">
            ₹{(netProfit || 0).toLocaleString()}
          </div>
          <p className="admin-stat-label">Net Profit</p>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">Quick Actions</h2>
        <div className="admin-btn-group">
          <button
            className="admin-btn admin-btn-success"
            onClick={() => {
              setModalType("revenue");
              setShowModal(true);
            }}
          >
            Add Revenue
          </button>
          <button
            className="admin-btn admin-btn-danger"
            onClick={() => {
              setModalType("expense");
              setShowModal(true);
            }}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );

  const renderRevenueTable = () => (
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
          Revenue Records
        </h2>
        <button
          className="admin-btn admin-btn-success"
          onClick={() => {
            setModalType("revenue");
            setShowModal(true);
          }}
        >
          Add Revenue
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenue.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.category}</td>
                <td>{item.item || "-"}</td>
                <td>₹{item.amount.toLocaleString()}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-action-btn admin-edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-action-btn admin-delete-btn"
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );

  const renderExpensesTable = () => (
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
          Expense Records
        </h2>
        <button
          className="admin-btn admin-btn-danger"
          onClick={() => {
            setModalType("expense");
            setShowModal(true);
          }}
        >
          Add Expense
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>₹{item.amount.toLocaleString()}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-action-btn admin-edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-action-btn admin-delete-btn"
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Cashflow Management</h1>
        <p className="admin-page-subtitle">Track revenue and expenses</p>
      </div>

      <div className="admin-card">
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <button
            className={`admin-btn ${activeTab === "overview" ? "admin-btn-primary" : "admin-btn-secondary"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`admin-btn ${activeTab === "revenue" ? "admin-btn-primary" : "admin-btn-secondary"}`}
            onClick={() => setActiveTab("revenue")}
          >
            Revenue
          </button>
          <button
            className={`admin-btn ${activeTab === "expenses" ? "admin-btn-primary" : "admin-btn-secondary"}`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </button>
        </div>

        {activeTab === "overview" && renderOverview()}
        {activeTab === "revenue" && renderRevenueTable()}
        {activeTab === "expenses" && renderExpensesTable()}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingItem
                  ? `Edit ${modalType === "revenue" ? "Revenue" : "Expense"}`
                  : `Add ${modalType === "revenue" ? "Revenue" : "Expense"}`}
              </h2>
              <button className="admin-modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <div className="admin-modal-body">
              {modalType === "revenue" ? (
                <form className="admin-form" onSubmit={handleSubmit}>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Category</label>
                      <select
                        className="admin-form-select"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Item Name</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        value={formData.item}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            item: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Amount (₹)</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: Number(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Quantity</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: Number(e.target.value),
                          })
                        }
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Date</label>
                    <input
                      type="date"
                      className="admin-form-input"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
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
                      {editingItem ? "Update" : "Add"} Revenue
                    </button>
                  </div>
                </form>
              ) : (
                <form className="admin-form" onSubmit={handleSubmit}>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Category</label>
                      <select
                        className="admin-form-select"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Ingredients">Ingredients</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Staff">Staff</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Vendor</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        value={formData.vendor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vendor: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Description</label>
                    <textarea
                      className="admin-form-textarea"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-form-label">Amount (₹)</label>
                      <input
                        type="number"
                        className="admin-form-input"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amount: Number(e.target.value),
                          })
                        }
                        required
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Date</label>
                      <input
                        type="date"
                        className="admin-form-input"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: e.target.value,
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
                      {editingItem ? "Update" : "Add"} Expense
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCashflow;
