import React from "react";

export const EmployeeTableLayout = ({
  employees,
  getStatusClass,
  handleEdit,
  handleDelete,
}: {
  employees: any[];
  getStatusClass: (status: string) => string;
  handleEdit: (employee: any) => void;
  handleDelete: (id: number) => void;
}): React.JSX.Element => {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>₹{employee.salary.toLocaleString()}</td>
              <td>
                <span
                  className={`admin-status-badge ${getStatusClass(employee.status)}`}
                >
                  {employee.status}
                </span>
              </td>
              <td>
                <div className="admin-actions">
                  <button
                    className="admin-action-btn admin-edit-btn"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-action-btn admin-delete-btn"
                    onClick={() => handleDelete(employee.id)}
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
  );
};
