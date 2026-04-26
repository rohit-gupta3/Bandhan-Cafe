import { supabaseClient } from "../infra/supabase";

const seedData = async () => {
  try {
    console.log("Starting database seed...");

    // Seed Employees
    const employees = [
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

    const { error: employeeError } = await supabaseClient
      .from("Employee")
      .insert(employees);

    if (employeeError) {
      console.error("Error seeding employees:", employeeError);
    } else {
      console.log("✓ Employees seeded successfully");
    }

    // Seed Salaries
    const salaries = [
      {
        id: 1,
        employeeId: 1,
        employeeName: "John Doe",
        baseSalary: 45000,
        bonus: 2000,
        deductions: 500,
        netSalary: 46500,
        paymentDate: "2024-04-01",
        status: "paid",
        month: "April 2024",
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: "Jane Smith",
        baseSalary: 32000,
        bonus: 500,
        deductions: 200,
        netSalary: 32300,
        paymentDate: "2024-04-01",
        status: "paid",
        month: "April 2024",
      },
      {
        id: 3,
        employeeId: 3,
        employeeName: "Mike Johnson",
        baseSalary: 28000,
        bonus: 0,
        deductions: 150,
        netSalary: 27850,
        paymentDate: null,
        status: "pending",
        month: "April 2024",
      },
    ];

    const { error: salaryError } = await supabaseClient
      .from("Salary")
      .insert(salaries);

    if (salaryError) {
      console.error("Error seeding salaries:", salaryError);
    } else {
      console.log("✓ Salaries seeded successfully");
    }

    // Seed Cashflow
    const cashflow = [
      {
        id: 1,
        type: "revenue",
        category: "Food Sales",
        amount: 2500,
        description: "Daily food sales",
        date: "2024-04-01",
        paymentMethod: "cash",
      },
      {
        id: 2,
        type: "revenue",
        category: "Beverage Sales",
        amount: 1800,
        description: "Coffee and tea sales",
        date: "2024-04-01",
        paymentMethod: "card",
      },
      {
        id: 3,
        type: "expense",
        category: "Ingredients",
        amount: 800,
        description: "Food and beverage supplies",
        date: "2024-04-01",
        paymentMethod: "card",
      },
      {
        id: 4,
        type: "expense",
        category: "Utilities",
        amount: 450,
        description: "Electricity and water bills",
        date: "2024-04-01",
        paymentMethod: "bank_transfer",
      },
      {
        id: 5,
        type: "expense",
        category: "Rent",
        amount: 2000,
        description: "Monthly rent payment",
        date: "2024-04-01",
        paymentMethod: "bank_transfer",
      },
    ];

    const { error: cashflowError } = await supabaseClient
      .from("Cashflow")
      .insert(cashflow);

    if (cashflowError) {
      console.error("Error seeding cashflow:", cashflowError);
    } else {
      console.log("✓ Cashflow seeded successfully");
    }

    console.log("Database seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedData();
