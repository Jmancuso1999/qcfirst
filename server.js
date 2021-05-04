const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect("mongodb+srv://qcfirst-admin:D3WkB9rtzMiSMfOa@qcfirst.cfs3k.mongodb.net/qcfirst", 
    {useNewUrlParser: true}, 
    {useUnifiedTopology: true}, 
    {userCreateIndex: true}
);

//Create data schema
const userSchema = {
    userName: String,
    fullName: String,
    email: String,
    password: String,
    birthday: Date,
    userType: String
}

const user = mongoose.model("user", userSchema);

// Get new_user
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/new_user.html")
})

// POST new_USER
app.post("/create", function(req, res) {
    let newUser = new user({
        userName: req.body.userN,
        fullName:req.body.fullName,
        email: req.body.emailAddr,
        password:req.body.userPass,
        birthday: req.body.month + "-" + req.body.day + "-" + req.body.year,
        userType: req.body.answer
    });
    
    newUser.save();
    console.log("User Created");
    res.redirect("studentHome.html");
})


app.listen(3000, function() {
    console.log("server is running on 3000");
})