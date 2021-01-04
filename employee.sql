DROP DATABASE IF EXISTS Employee_DB;
CREATE DATABASE Employee_DB;

USE Employee_DB;

CREATE TABLE department(
  id - INT PRIMARY KEY AUTO_INCREMENT,
  name - VARCHAR(30)
);

create TABLE roles(
    id - INT PRIMARY KEY AUTO_INCREMENT,
    title- VARCHAR(30),
    salary - DECIMAL,
);

create TABLE employees(
    id - INT PRIMARY KEY AUTO_INCREMENT,
    first_name - VARCHAR(30),
    last_name - VARCHAR(30),
    role - VARCHAR(30),
    role_id - INT,
)