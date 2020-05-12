DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id INTEGER(30) NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(90),
  devoured BOOLEAN 
);