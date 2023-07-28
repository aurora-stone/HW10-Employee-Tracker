const inquirer = require("inquirer")
const mysql = require("mysql2")
const db = mysql.createConnection(
    {
      host: 'localhost',
     
      user: 'root',
    
      password: 'happytrails',
      database: 'stuff_db'
    },
    console.log(`Connected to the stuff_db database.`)
  );
  function menu(){
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "Menu",
            choices: ["View department", "View role", "View employee", "Add department", "Add role", "Add employee", "Update employee role"],
        
        }
    )
    .then(response => {
        if (response.Menu === "View department"){
            viewDepartment()
        }
        if (response.Menu === "View role"){
            viewRole()
        }
        if (response.Menu === "View employee"){
            viewEmployee()
        }
        if (response.Menu === "Add department"){
            addDepartment()
        }
        if (response.Menu === "Add role"){
            addRole()
        }
        if (response.Menu === "Add employee"){
            addEmployee()
        }
        if (response.Menu === "Update employee role"){
            updateEmployeeRole()
        }
    })
  }
  function viewDepartment(){
    db.query("SELECT * FROM department", (error, data) => {
        console.table(data)
        menu()
    })
  }
  function viewRole(){
    db.query("SELECT * FROM role", (error, data) => {
        console.table(data)
        menu()
    })
  }
  function viewEmployee(){
    db.query("SELECT * FROM employee", (error, data) => {
        console.table(data)
        menu()
    })
  }
  function addDepartment(){
   inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "Name"
        }
    ])
    .then(response => {
        db.query("INSERT INTO department (name) VALUES (?)", [response.Name], (error, data) => {
            console.table(data)
            menu()
        })
    })
  }
  function addRole(){
    db.query("SELECT * FROM department", (error, data) => {
       const departments = data.map(department => (
        {
            name: department.name,
            value: department.id
        }
       ))
    
    inquirer.prompt([
         {
             type: "input",
             message: "What is the name of the new role?",
             name: "Name"
         },
         {
            type: "input",
            message: "What is the salary of the new role?",
            name: "Salary"
        },
        {
            type: "list",
            message: "What department does this role belong in?",
            name: "Department",
            choices: departments
        }
     ])
     .then(response => {
         db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.Name, response.Salary, response.Department], (error, data) => {
             console.table(data)
             menu()
         })
     })
    })
   }
   function addEmployee(){
    db.query("SELECT * FROM role", (error, data) => {
       const roles = data.map(role => (
        {
            name: role.title,
            value: role.id
        }
       ))
       db.query("SELECT * FROM employee", (error, data) => {
        const employees = data.map(employee => (
         {
             name: employee.first_name + " " + employee.last_name,
             value: employee.id
         }
        ))
    inquirer.prompt([
         {
             type: "input",
             message: "What is the first name of the new employee?",
             name: "First"
         },
         {
            type: "input",
            message: "What is the last name of the new employee?",
            name: "Last"
        },
        {
            type: "list",
            message: "What role does this employee have?",
            name: "Role",
            choices: roles
        },
        {
            type: "list",
            message: "Who is this employee's manager?",
            name: "Manager",
            choices: employees
        }
     ])
     .then(response => {
         db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.First, response.Last, response.Role, response.Manager], (error, data) => {
             console.table(data)
             menu()
         })
     })
    })
})
   }
   function updateEmployeeRole(){
    db.query("SELECT * FROM role", (error, data) => {
       const roles = data.map(role => (
        {
            name: role.title,
            value: role.id
        }
       ))
       db.query("SELECT * FROM employee", (error, data) => {
        const employees = data.map(employee => (
         {
             name: employee.first_name + " " + employee.last_name,
             value: employee.id
         }
        ))
    inquirer.prompt([
        {
            type: "list",
            message: "Who is the employee you are updating?",
            name: "Employee",
            choices: employees
        },
        {
            type: "list",
            message: "What is the updated role for this employee?",
            name: "Role",
            choices: roles
        },
     ])
     .then(response => {
         db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.Role, response.Employee], (error, data) => {
             console.table(data)
             menu()
         })
     })
    })
})
   }
  menu()