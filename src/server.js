const express = require("express");
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
let { Visitors } = require("./visitor");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.use(express.static("public"));
app.get("/new_visit", (req, res) => {
  res.sendFile(path.join(__dirname,"../public/new_visit.html"));
});

app.post("/add_visitor", async (req, res) => {
  let visitor1 = new Visitors();
  
  let visitorInfo = await visitor1.addNewVisitor( 
    req.body.visitor_name,
    req.body.visitor_age,
    req.body.date_of_visit,
    req.body.time_of_visit,
    req.body.your_name,
    req.body.comments);

  res.render('index', {
    title:"Thank you",
    header:"Thanks for the display the information that was saved to the database:",
    data: visitorInfo[0]
  })
              
});

let server = app.listen(3000, () => {
  let port = server.address().port;

  console.log("Listening at " + port);
})
