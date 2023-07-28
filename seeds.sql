
INSERT INTO department (name)
VALUE ("Research");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("HR");


INSERT INTO role (title, salary, department_id)
VALUE ("Head Researcher", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Head Salesperson", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Head Human Resourcer", 120000, 3);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sponge", "Bob", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick", "Star", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Squidward", "Tentacles", null,3 );
