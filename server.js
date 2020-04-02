const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const pug = require("pug")
const {Pool} = require('pg')
const pool = new Pool({
    user: "user",
    password: "pass",
    host: "localhost",
    port: 5432,
    database: "visitordb"
})

let { Visitors } = require("./visitor");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.use(express.static("public"));
app.get("/new_visit", (req, res) => {
  res.sendFile(__dirname + "/" + "public/new_visit.html");
});

app.post("/add_visitor", async (req, res) => {
  let visitor1 = new Visitors(
    req.body.visitor_name,
    req.body.visitor_age,
    req.body.date_of_visit,
    req.body.time_of_visit,
    req.body.your_name,
    req.body.comments
  );
  visitor1.addNewVisitor();

  let visitorInfo = {
    Visitor_Name:req.body.visitor_name,
    visitor_age:req.body.visitor_age,
    date_of_visit:req.body.date_of_visit,
    time_of_visit:req.body.time_of_visit,
    your_name:req.body.your_name,
    comments:req.body.comments
  }
  
  res.render('index', {
    title:"Thank you",
    header:"Thanks for the display the information that was saved to the database:",
    message: visitorInfo
  })
              
});

let server = app.listen(3000, () => {
  let port = server.address().port;

  console.log("Listening at " + port);
})
