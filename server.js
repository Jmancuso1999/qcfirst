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
//app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use('/img', express.static(__dirname + '/img'));
//app.use('/html', express.static(__dirname + '/html'));
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
To Complete:
- POST request for the Create Course
- HTML for incorrect username/password
    - Try EJS if i need to add text to the page 
- acknlowedge signup??? Or is redirecting fine?
- For populating the Add Courses Page --> can I just create a function that queries the database. 


- CHECK NOTES APP ON PHONE
    - Also, need to find a way to have users and instructors schedule update automatically.
        - IDEA: Save the userID in the session and query that userID and use DOM manipulation to add the schedule.
                So when the user logins to req.session.userID = req.body.userID


    - For the filter page --> I was thinking a condition that checks ALL of the filter options
        - Google and figure this out 
*/
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/html/index.html'));
});


app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/new_user.html'));
});

app.get('/forgot', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/forgot.html'));
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
                console.log(result);
                req.session.loggedin = true;
                req.session.user = username;
                req.session.userID = result[0].userID;
                req.session.answer = result[0].userType; 
                if(result[0].userType == 'Student') res.redirect('/studentHome');
                else res.redirect('/instructorHome');
            }
            else {
                // Add HTML to user screen if password or username is incorrect 


                res.redirect("/");
            }
        });
    }
    else {

        // Add HTML to user screen if password or username is incorrect 

        res.send("Enter a username/password");
        res.end();
    }
});

app.get('/logout', function(req, res){
    console.log("Logging Out");
    req.session.answer = null;
    req.session.loggedin = false;
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

    req.session.loggedin = true;
    req.session.answer = req.body.answer;
    if(userType == 'Student') res.redirect("/studentHome");
    else res.redirect("/instructorHome");
});


// Local reroute to studentHome works but studentHome.html does not work -- test on heroku if this is the case there as well
app.get('/studentHome', authPage(["Student"]), function(req, res) {
    console.log("Student Home: " + req.session.loggedin);
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname + '/html/studentHome.html'));
	} else {
        res.redirect("/");
	}
	res.end();
});

// authPage(["Instructor"]) - add back when i find fix
app.get('/instructorHome', authPage(["Instructor"]), function(req, res) {
    console.log("Instructor Home: " + req.session.loggedin);
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname + '/html/instructorHome.html'));
	} else {
        res.redirect("/");
	}
	res.end();
});

app.get('/studentEnroll', authPage(["Student"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname + '/html/studentEnroll.html'));
	} else {
        res.redirect("/");
	}
	res.end();
});


app.get('/instructorEnroll', authPage(["Instructor"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname + '/html/instructorEnroll.html'));
	} else {
        res.redirect("/");
	}
	res.end();
});

app.get('/instructorRoster', authPage(["Instructor"]), function(req, res) {
    console.log(req.session.loggedin);
	if (req.session.loggedin) {
		return res.sendFile(path.join(__dirname + '/html/instructorRoster.html'));
	} else {
        res.redirect("/");
	}
	res.end();
});

// Course Created Form
app.post("/createCourse", function(req, res) {
    let courseName = req.body.courseN;
    let courseNumber = req.body.uniqueNum;
    let department = req.body.depart;

    // Add instructor username or ID --> need for SQL purposes
    let instructorID = req.session.userID;

    let capacity = req.body.capacityNum;
    let days = req.body.day;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let semester = req.body.terms;
    let enrollmentDeadline = "2022-01-01"; // Replace with .body when fixed
    let description = req.body.classDesc;
    let message = req.body.msg;

    // Course Table
    var sql1 = `INSERT INTO Course(courseName, courseNumber, department, instructorID, capacity, startTime, endTime, semester, enrollmentDeadline, description, message) VALUES('${courseName}', '${courseNumber}', '${department}', '${instructorID}', '${capacity}', '${startTime}', '${endTime}', '${semester}', '${enrollmentDeadline}', '${description}', '${message}')`;
    
    // Obtains the LAST course (aka the course just inserted)
    db.query(sql1, function (err) {
        if (err) throw err;

        // Make sure to add HTML for this if error occurs

        else {
            console.log("1 record inserted");
        }
    });

    // Course_Days Table --> Iterate through the ARRAY (days) size of the variable and inserts the course we've just made into the Course_days table
    var findID = `select courseID from Course ORDER BY courseID DESC LIMIT 1`
    db.query(findID, function(err, result) {
        if(err) throw err;
        for(let i = 0; i < days.length; i++) {
            var sql2 = `INSERT INTO Course_Days(courseID, day) VALUES('${result[0].courseID}', '${days[i]}')`;
            db.query(sql2, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });


    res.redirect('/instructorHome');
});


app.get('/*', function(req, res) {  
    req.session.loggedin = false;
    req.session.answer = null;
    res.redirect('/');
});

 app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

module.exports = app;