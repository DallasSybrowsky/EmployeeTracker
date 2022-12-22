// Importing dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the employees database.")
);
const promptQuestions = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: [
    "View all employees",
    "View all employees by department",
    "View all employees by manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee manager",
    "View all roles",
    "Add role",
    "Remove role",
    "View all departments",
    "Add department",
    "Remove department",
    "View the total utilized budget of a department",
    "View the total budget of the organization",
    "Exit",
  ],
};
const initQuery = () => {
  return inquirer.prompt(promptQuestions).then((answer) => {
    switch (answer.action) {
      case "View all employees":
        viewAllEmployees();
        break;
      case "View all employees by department":
        viewAllEmployeesByDepartment();
        break;
      case "View all employees by manager":
        viewAllEmployeesByManager();
        break;
      case "Add employee":
        addEmployee();
        break;
      case "Remove employee":
        removeEmployee();
        break;
      case "Update employee role":
        updateEmployeeRole();
        break;
      case "Update employee manager":
        updateEmployeeManager();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "Add role":
        addRole();
        break;
      case "Remove role":
        removeRole();
        break;
      case "View all departments":
        viewAllDepartments();
        break;
      case "Add department":
        addDepartment();
        break;
      case "Remove department":
        removeDepartment();
        break;
      case "View the total utilized budget of a department":
        viewTotalUtilizedBudget();
        break;
      case "View the total budget of the organization":
        viewTotalBudget();
        break;
      case "Exit":
        exit();
        db.end();
        break;
    }
  });
};
const viewAllEmployees = () => {
  db.query(
    `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS Employee_Name, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      initQuery();
    }
  );
};
const viewAllEmployeesByDepartment = () => {
  db.query(
    `SELECT department.name AS Department, CONCAT(employees.first_name, ' ', employees.last_name) AS Employees FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      initQuery();
    }
  );
};
const viewAllEmployeesByManager = () => {
  db.query(
    `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, CONCAT(employees.first_name, ' ', employees.last_name) AS Employees FROM employees LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY manager`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      initQuery();
    }
  );
};
const addEmployee = () => {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    const roleChoices = res.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    db.query(`SELECT * FROM employees`, (err, res) => {
      if (err) throw err;
      const managerChoices = res.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      managerChoices.unshift({ name: "None", value: null });
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          db.query(`INSERT INTO employees SET ?`, answer, (err) => {
            if (err) throw err;
            console.log("Employee added!");
            initQuery();
          });
        });
    });
  });
};
const removeEmployee = () => {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee would you like to remove?",
          choices: employeeChoices,
        },
      ])
      .then((answer) => {
        db.query("DELETE FROM employees WHERE ?", answer, (err) => {
          if (err) throw err;
          console.log("Employee removed!");
          initQuery();
        });
      });
  });
};
const updateEmployeeRole = () => {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    db.query("SELECT *FROM role", (err, res) => {
      if (err) throw err;
      const roleChoices = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's new role?",
            choices: roleChoices,
          },
        ])
        .then((answer) => {
          db.query(
            "UPDATE employees SET ? WHERE ?",
            [answer, { id: answer.id }],
            (err) => {
              if (err) throw err;
              console.log("Employee role updated!");
              initQuery();
            }
          );
        });
    });
  });
};
const updateEmployeeManager = () => {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    db.query("SELECT *FROM employees", (err, res) => {
      if (err) throw err;
      const managerChoices = res.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      managerChoices.unshift({ name: "None", value: null });
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's new manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          db.query(
            "UPDATE employees SET ? WHERE ?",
            [answer, { id: answer.id }],
            (err) => {
              if (err) throw err;
              console.log("Employee manager updated!");
              initQuery();
            }
          );
        });
    });
  });
};
const viewAllRoles = () => {
  db.query("SELECT role.title AS Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department ON role.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    initQuery();
  });
};
const addRole = () => {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const departmentChoices = res.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        db.query("INSERT INTO role SET ?", answer, (err) => {
          if (err) throw err;
          console.log("Role added!");
          initQuery();
        });
      });
  });
};
const removeRole = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const roleChoices = res.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Which role would you like to remove?",
          choices: roleChoices,
        },
      ])
      .then((answer) => {
        db.query("DELETE FROM role WHERE ?", answer, (err) => {
          if (err) throw err;
          console.log("Role removed!");
          initQuery();
        });
      });
  });
};
const viewAllDepartments = () => {
  db.query("SELECT * FROM department AS Departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    initQuery();
  });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO department SET ?", answer, (err) => {
        if (err) throw err;
      });
      console.log("Department added!");
      initQuery();
    });
};
const removeDepartment = () => {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const departmentChoices = res.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "Which department would you like to remove?",
          choices: departmentChoices,
        },
      ])
      .then((answer) => {
        console.log(answer);
        db.query("DELETE FROM department WHERE name = ?", answer.id, (err) => {
          if (err) throw err;
          console.log("Department removed!");
          initQuery();
        });
      });
  });
};
const viewTotalUtilizedBudget = () => {
  db.query(
    "SELECT department.name AS Department, SUM(role.salary) AS Utilized_budget FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.name ORDER BY utilized_budget DESC",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      initQuery();
    }
  );
};
const viewTotalBudget = () => {
  db.query(
    "SELECT department.name AS department, SUM(role.salary) AS total_budget FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.name ORDER BY total_budget DESC",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      initQuery();
    }
  );
};
const exit = () => {
  console.log("Thank you for using the app, goodbye!");
  process.exit();
};
// Start the app
initQuery();
