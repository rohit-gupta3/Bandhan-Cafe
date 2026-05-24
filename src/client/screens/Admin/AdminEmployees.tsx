import React, { useState, useEffect } from "react";
import { EmployeeTableLayout } from "../../components/Table";
import { Employee } from "../../../types";

const AdminEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    hire_date: "",
    salary: 0,
    status: "active",
    address: "",
    emergency_contact: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/admin/employees");
        const body = await response.json();
        if (body && body.success && Array.isArray(body.data)) {
          setEmployees(body.data);
        } else {
          console.error("Failed to load employees:", body?.error || body);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        // Update existing employee
        try {
          const response = await fetch(
            `/api/admin/employees/${editingEmployee.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            },
          );
          const body = await response.json();
          if (body && body.success) {
            setEmployees(
              employees.map((emp) =>
                emp.id === editingEmployee.id ? body.data : emp,
              ),
            );
          } else {
            console.error("Failed to update employee:", body?.error || body);
          }
        } catch (error) {
          console.error("Error updating employee:", error);
        }
      } else {
        // Create new employee
        try {
          const response = await fetch("/api/admin/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const body = await response.json();
          if (body && body.success) {
            setEmployees([...employees, body.data]);
          } else {
            console.error("Failed to create employee:", body?.error || body);
          }
        } catch (error) {
          console.error("Error creating employee:", error);
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: (employee as any).email || "",
      phone: employee.phone,
      role: employee.role,
      hire_date:
        typeof (employee as any).hire_date === "string"
          ? (employee as any).hire_date.split("T")[0]
          : new Date((employee as any).hire_date).toISOString().split("T")[0],
      salary: employee.salary,
      status: employee.status,
      address: employee.address || "",
      emergency_contact: employee.emergency_contact || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`/api/admin/employees/${id}`, {
          method: "DELETE",
        });
        const body = await response.json();
        if (body && body.success) {
          setEmployees(employees.filter((emp) => emp.id !== id));
        } else {
          console.error("Failed to delete employee:", body?.error || body);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      hire_date: "",
      salary: 0,
      status: "active",
      address: "",
      emergency_contact: "",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "admin-status-active";
      case "inactive":
        return "admin-status-inactive";
      default:
        return "admin-status-inactive";
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Employee Management</h1>
        <p className="admin-page-subtitle">Manage your restaurant staff</p>
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
            Employees ({employees.length})
          </h2>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add Employee
          </button>
        </div>
        <EmployeeTableLayout
          employees={employees}
          getStatusClass={getStatusClass}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        {employees.length === 0 && (
          <div className="admin-empty-state">
            <p>No employees found. Add your first employee to get started.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h2>
              <button className="admin-modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <div className="admin-modal-body">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Full Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Phone</label>
                    <input
                      type="tel"
                      className="admin-form-input"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Role</label>
                    <select
                      className="admin-form-select"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Manager">Manager</option>
                      <option value="Waiter">Waiter</option>
                      <option value="Chef">Chef</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      Monthly Salary (₹)
                    </label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Hire Date</label>
                    <input
                      type="date"
                      className="admin-form-input"
                      value={formData.hire_date}
                      onChange={(e) =>
                        setFormData({ ...formData, hire_date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select
                      className="admin-form-select"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as any,
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Address</label>
                  <textarea
                    className="admin-form-textarea"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Emergency Contact</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={formData.emergency_contact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergency_contact: e.target.value,
                      })
                    }
                    placeholder="Name and phone number"
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
                  <button type="submit" className="admin-btn admin-btn-primary">
                    {editingEmployee ? "Update" : "Add"} Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEmployees;
