// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');


// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3306;
const dbConfig = (process.env.NODE_ENV === 'production') ? dbConfig.heroku : config.db

// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// const localConfig = {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "jenelle",
    password: "jenelle123",
    database: "burgers_db",
  });
// }


// HEROKU INFO
const productionfig = {
heroku: {
  host: 'qn66usrj1lwdk1cc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'mb0zcukxt9ff2dpu',
  password: 'fem9i5ip8xl069zb',
  database: 'ha4a7cr7o6vl4ygy'
}
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// ROUTES
app.get('/', function(req,res) {
  connection.query('SELECT * FROM burgers;', function (err, data) {
    if (err) {
      throw err; 
    }
    res.render('index', {burgers: data});
  });
  
});

app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers VALUES (?)", [req.body.burgers], function(err, result) {
    if (err) {
      throw err;
    }
    res.redirect("/");
  });
});






// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});