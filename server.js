// DEPENDENCIES
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');


// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3002;
// const dbConfig = (process.env.NODE_ENV === 'production') ? dbConfig.heroku : config.db

// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


  const connection = mysql.createConnection({
    host: "localhost",
    port: 3002,
    user: "jenelle",
    password: "jenelle123",
    database: "burgers_db",
  });



connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// ROUTES
app.get('/', function(req,res) {
  connection.query('SELECT * FROM burgers;', function (err, response) {
    if (err) throw err; 
    const orderedBurger = [];
    const eatenBurger = [];
    for (var i =0; i < response.length; i++) {
      if (response[i].devoured) {
        eatenBurger.push(response[i])
      }
    }
    
    res.render('index', {orderedBurger: orderedBurger, eatenBurger: eatenBurger });
  });
  
});

app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers VALUES (?)", { burger_name: req.body.burgers, devoured: false }, 
  {
    function (err, res) {
      if (err) throw err;
    }
  });
    res.redirect("/")
});






// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});