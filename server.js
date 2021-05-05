const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const path = require('path');
const { response } = require("express");

const db = mysql.createConnection({
	  host     : 'sql5.freemysqlhosting.net',
      port     :  3306,
	  user     : 'sql5410319',
	  password : 'HHEfwfsKhX',
	  database : 'sql5410319'
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


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.get('/', function(req, res) {
	response.sendFile(path.join(__dirname + '/index.html'));
});


// Source: codeshak.io - David Adams 
// https://codeshack.io/basic-login-system-nodejs-express-mysql/
app.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.bodypassword;

    if(email && password) {
        var sql = `select * from User where email = '${email}' and password = '${password}'`;
        db.query(sql, function(err, result) {
            if(result.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/home');
            }
            else {
                res.send('Invalid username/password.');
            }
        });
    }
    else {
        res.send("Enter a username/password");
        res.end();
    }
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		res.redirect("studentHome.html");
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/create', function(req, res) {
    let userName = req.body.userN;
    let fullName = req.body.fullName;
    let email = req.body.emailAddr;
    let password = req.body.userPass;
    let birthday = req.body.year + '-' + req.body.month + '-' + req.body.day;
    let userType = req.body.answer;

    var sql = `INSERT INTO User(userName, fullName, email, password, birthday, userType) VALUES('${userName}', '${fullName}', '${email}', '${password}', '${birthday}', '${userType}')`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    res.redirect("studentHome.html");
});


app.listen(3000, () => {
    console.log('Server running on port: 3000');
});