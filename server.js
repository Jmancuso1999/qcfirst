const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const { connect } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3000;
const url = "mongodb+srv://qcfirst-admin:D3WkB9rtzMiSMfOa@qcfirst.cfs3k.mongodb.net/qcfirst";
var db;

MongoClient.connect(url, (err, database) => {
    if(err) {
        console.log(err);
    }
    console.log("server is running on 3000");
    db = database.db("qcfirst");
    app.listen(3000 , '0.0.0.0');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('img'));
app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

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
    
    db.collection('users').insertOne(newUser, function(err, collection) {
        if(err)  res.status(err.status || 500);
    });
    console.log("User Created");
    res.redirect("studentHome.html");
})

