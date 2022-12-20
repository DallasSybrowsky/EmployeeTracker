INSERT INTO department (name)
VALUES ('Management'),
       ('Vocals'),
       ('Guitar'),
       ('Bass'),
       ('Drums');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 120000, 1),
       ('Singer', 100000, 2),
       ('Guitarist', 90000, 3),
       ('Bassist', 70000, 4),
       ('Drummer', 80000, 5),

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Scott', 'Matthews', 5, null),
       ('Freddie', 'Mercury', 1, 1),
       ('Eddie', 'Van Halen', 4, 1);
       
-- (1, 'Dave', 'Grohl', 1, 7), 
       -- (2, 'Chad', 'Smith', 2, 11), 
       -- (3, 'Till', 'Lindemann', 1, 7),
       -- (4, 'Travis', 'Barker', 2, 11),
       -- (5, 'James', 'Hetfield', 4, 10), 
       -- (6, 'John', 'Deacon', 3, 12), 
       -- (7, 'Freddie', 'Mercury', 1, 12), 
       -- (8, 'Jaco', 'Pastorius', 3, 6), 
       -- (9, 'Brian', 'Johnson', 1, 7), 
       -- (10, 'Eddie', 'Van Halen', 4, 12), 
       -- (11, 'Neal', 'Peart', 2, 12),
       -- (12, 'Scott', 'Matthews', 5, 12), 
       -- (13, 'Dave', 'Raun', 2, 11), 
       -- (14, 'Pete', 'McCullough', 3, 6), 
       -- (15, 'Michael', 'Balzary', 3, 6), 
       -- (16, 'Scott', 'Klopfenstein', 4, 10); 
-- TO DO: reorder employees table so managers are first, then employees

