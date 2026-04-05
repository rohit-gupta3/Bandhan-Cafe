import { Router } from "express";


export let employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@bandhancafe.com",
      phone: "+1-555-0123",
      role: "Manager",
      salary: 45000,
      hireDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@bandhancafe.com",
      phone: "+1-555-0124",
      role: "Barista",
      salary: 32000,
      hireDate: "2023-03-20",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@bandhancafe.com",
      phone: "+1-555-0125",
      role: "Waiter",
      salary: 28000,
      hireDate: "2023-05-10",
      status: "active",
    },
  ];

export const employeeRoutes = ():Router => {
 const app = Router()

   app.get("/", (req, res) => {
     res.json({ employees });
   });
 
   app.post("/", (req, res) => {
     const newEmployee = {
       id: employees.length + 1,
       ...req.body,
       status: "active",
     };
     employees.push(newEmployee);
     res.json({ employee: newEmployee });
   });
 
   app.put("/:id", (req, res) => {
     const id = parseInt(req.params.id);
     const employeeIndex = employees.findIndex((emp) => emp.id === id);
     if (employeeIndex === -1) {
       return res.status(404).json({ error: "Employee not found" });
     }
     employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
     res.json({ employee: employees[employeeIndex] });
   });
 
   app.delete("/:id", (req, res) => {
     const id = parseInt(req.params.id);
     const employeeIndex = employees.findIndex((emp) => emp.id === id);
     if (employeeIndex === -1) {
       return res.status(404).json({ error: "Employee not found" });
     }
     employees.splice(employeeIndex, 1);
     res.json({ message: "Employee deleted successfully" });
   });

   return app;
}