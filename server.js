var express = require("express");
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var path = require('path');
const {authPage} = require('./js/middlewares');

var port = 3306;

var db = mysql.createConnection({
	  host     : 'sql5.freemysqlhosting.net',
      port     :  3306,
	  user     : 'sql5410319',
	  password : 'HHEfwfsKhX',
	  database : 'sql5410319'
	});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set('port', process.env.port || port); 
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

/*
Logging Out:

-	Can set onclick() --> manually create a request with AJAX to send to the logout endpoint
-	Wrap button in a tag and set href to /logout GET and which should just have the tag go to logout route

Session issue:
-	Potential FIX: Local reroute to studentHome works but studentHome.html does not work -- test on heroku if this is the case there as well
-	


Ask mark about this: You should acknowledge the user when their signup succeeded.
-	Does he want us to redirect to the login page after successful sign up? What exactly did he mean by this?
-	Does he want us to acknowledge them even after redirect?

-	Try EJS if i need to add text to the page 

*/
app.get('/', function(req, res) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

// Source: codeshak.io - David Adams 
// https://codeshack.io/basic-login-system-nodejs-express-mysql/
app.post('/login', function(req, res) {
    let username = req.body.userN;
    let password = req.body.userPass;

    console.log("Login Page: " + username + " " + password);

    if(username && password) {
        var sql = `select * from User where userName = '${username}' and password = '${password}'`;
        db.query(sql, function(err, result) {
            if(result.length > 0) {
                req.session.loggedin = true;
                req.session.user = username;
                req.session.answer = result[0].userType; 
                if(result[0].userType == 'Student') res.redirect('/studentHome');
                else res.redirect('/instructorHome');
            }
            else {
                res.redirect("/");
            }
        });
    }
    else {
        res.send("Enter a username/password");
        res.end();
    }
});

app.get('/logout', function(req, res){
    console.log("Logging Out");
    req.session.loggedin = false;
    req.logout();
    res.redirect('/');
  });

app.post('/create', function(req, res) {
    let userName = req.body.userN;
    let fullName = req.body.fullName;
    let email = req.body.emailAddr;
    let password = req.body.userPass;
    let birthday = req.body.year + '-' + req.body.month + '-' + req.body.day;
    let userType = req.body.answer;

    var sql = `INSERT INTO User(userName, fullName, email, password, birthday, userType) VALUES('${userName}', '${fullName}', '${email}', '${password}', '${birthday}', '${userType}')`;

    db.query(sql, function (err) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    if(userType == 'Student') res.redirect("/studentHome");
    else res.redirect("/instructorHome");
});


/**
 * 
 *  Middleware works --> But the userType is NOT returning "Student" so figure that out
 * 
 * Either fix it in that class or create a similar function within every GET 
 * 
 */

// authPage(["Student"]) - add back when i find fix

// Local reroute to studentHome works but studentHome.html does not work -- test on heroku if this is the case there as well

 app.get('/studentHome',authPage(["Student"]), function(req, res) {
    console.log("Student Home: " + req.session.loggedin);
    console.log("Student info: " + req.body.userN)
	if (req.session.loggedin) {
		res.redirect("studentHome.html");
	} else {
        //res.redirect("/");
        res.send("Invalid page for user.");
	}
	res.end();
});

// authPage(["Instructor"]) - add back when i find fix
app.get('/instructorHome', authPage(["Instructor"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		res.redirect("instructorHome.html");
	} else {
        res.redirect("/");
	}
	res.end();
});

app.get('/studentEnroll', authPage(["Student"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		res.redirect("studentEnroll.html");
	} else {
        res.redirect("/");
	}
	res.end();
});


app.get('/instructorEnroll', authPage(["Instructor"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		res.redirect("instructorEnroll.html");
	} else {
        res.redirect("/");
	}
	res.end();
});

app.get('/instructorRoster', authPage(["Instructor"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		res.redirect("instructorRoster.html");
	} else {
        res.redirect("/");
	}
	res.end();
});


app.get('/*', function(req, res) {
    res.redirect('/');
});

 app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

module.exports = app;