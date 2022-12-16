const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employees database.')
);

const promptQuestions = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices:[
        'View all employees',
        'View all employees by department',
        'View all employees by manager',
        'Add employee',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        'View all roles',
        'Add role',
        'Remove role',
        'View all departments',
        'Add department',
        'Remove department',
        'View the total utilized budget of a department',
        'Exit'
    ]
};