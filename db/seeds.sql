INSERT INTO department (name)
VALUES ('Management'),
       ('Vocals'),
       ('Guitar'),
       ('Bass'),
       ('Rhythm');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 500000, 1),
       ('Singer', 750000, 2),
       ('Guitarist', 750000, 3),
       ('Bassist', 700000, 4),
       ('Drummer', 700000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Scott', 'Matthews', 1, null),
       ('Freddie', 'Mercury', 2, 1), 
       ('Eddie', 'Van Halen', 3, 1),
       ('John', 'Deacon', 4, 1),
       ('Neal', 'Peart', 5, 1),
       ('Dave', 'Grohl', 2, 2),
       ('Till', 'Lindemann', 2, 2),
       ('Brian', 'Johnson', 2, 2),
       ('Scott', 'Klopfenstein', 3, 3),
       ('Chris', 'Rest', 3, 3),
       ('James', 'Hetfield', 3, 3),
       ('Pete', 'McCullough', 4, 4), 
       ('Michael', 'Balzary', 4, 4),
       ('Joe', 'Raposo', 4, 4),
       ('Travis', 'Barker', 5, 5),
       ('Dave', 'Raun', 5, 5), 
       ('Chad', 'Smith', 5, 5);

