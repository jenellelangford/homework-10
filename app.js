// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "jenelle",
  // Your password
  password: "jenelle123",
  database: "burger_db",
});

// ROUTES








// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});