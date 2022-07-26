var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://handsforpaws:bfPIegDOPjLuqg02@handsforaws.ux3rnyk.mongodb.net/Agritech"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});
var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var fname = req.body.firstname;
  var lname = req.body.lastname;
  var uname = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  var phone = req.body.number;
  var dob = req.body.dob;
  var address = req.body.address;
  var pincode = req.body.pincode;

  var data = {
    firstname: fname,
    lastname: lname,
    username: uname,
    email: email,
    password: pass,
    phone: phone,
    dob: dob,
    address: address,
    pincode: pincode,
  };
  db.collection("users").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("http://localhost:5501/pages/farmer.html");
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("http://localhost:5501");
  })
  .listen(3000);

console.log("server listening at port 3000");
