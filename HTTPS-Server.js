/*
	Main server (node.js)
	- Only accepts https connections
	- Handles HTTPS GET and POST requests
	- Checks for login data
	- Renders patient search list
	- Sends data to plot the diagram
 */


//	Include necessary modules

//	Https module
var https = require('https');
//	File system module
var fs = require('fs');
//	Express module
var express = require("express");
//	Handlebars module for express to render patient list
var hbs = require("express-handlebars");
//	Configure server via express
var app = express();
//	Get data from http request body
var bodyparser = require('body-parser');
//	Handle session cookies with express
var session = require('express-session');
//	Generate ids
var uuid = require('uuid');
//	Mysql module for node.js
var mysql = require('mysql');

//	Establish connection to mysql database
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "EMoodTracker"
});

//	Configure bodyparser for use with json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//	Set view folder and engine to render patient list
app.set("views", __dirname + "/views");
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set("view engine", "hbs");

//	Set session cookies
app.use(session({
	UID: null,
	status: null,
	secret: 'red sea',
	name : 'sessToken',
	resave: false,
	saveUninitialized: false
}));

//	Handle get request for login page
app.get("/", function(req, res) {
		if (req.session.UID !== null) {
			console.log("Already logged in as " + req.session.status);
			res.redirect("/startPage");
		}
		else {
			console.log("Sending login HTML page");
			res.sendFile(__dirname + '/HTML/login.html');
		}
});
//	Handle user login request
app.post("/loginAttempt", function(req, res) {
	console.log("Login attempt");
	if (req.body.user && req.body.password) {
		if (req.session.UID !== null) {
			console.log("Already logged in as " + req.session.status);
			res.redirect("/startPage");
		}
		else {
			//	Get username and password from http body
			let usr = req.body.user;
			let pwHash = req.body.password;
			//	SQL search strings for two login types
			let sqlStringPat = "SELECT Username,passworthash,PatientenID FROM Patientenlogin";
			let sqlStringPsych = "SELECT Username,passworthash,PsychologenID FROM Psychologenlogin";
				//	Mysql query handler function returns false if not found and true if found;
				let patFound = con.query(sqlStringPat, async function(err, result){
					try {
						let notfound = true;
						await console.log(result);
						for (let i = 0; i < result.length; i++) {
							if (result[i].Username === usr && result[i].passworthash === pwHash) {
								//	Save patient id in cookie
								req.session.dbId = result[i].PatientenID;
								//	Generate unique time-based id for logged-in user and save in session cookie
								req.session.UID = uuid.v1();
								req.session.status = "patient";
								await notfound = false;
								await res.sendFile(__dirname + '/HTML/tagebuch.html');
								return true;
							}
						}
						//	Patient not found
						if (notfound) {
							await console.log("No patient found");
							//	Send http 401 status
							await res.sendStatus(401);
							return false;
						}

					}
					//	Catch error during query handling
					catch(err) {
						console.log(err);
					}
				});
				//	Check if a patient has been found, if not continue searching
				if (!patFound)
				{
					con.query(sqlStringPsych, async function(err, result){
						//	Same procedure as with patient
						try {
							let notfound = true;
							await console.log(result);
							for(let i = 0; i < result.length; i++){
								if(result[i].Username === usr && result[i].passworthash === pwHash){
									//	Save psychologist id in cookie
									req.session.dbId = result[i].PatientenID;
									//	Generate unique time-based id for logged-in user and save in session cookie
									req.session.UID = uuid.v1();
									req.session.status = "psychologist";
									await notfound = false;
									await res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
									break;
								}
							}
							if (notfound) {
								await console.log("No psychologist found");
								await res.sendStatus(401);
							}
						}
						//	Catch error during query handling
						catch (err) {
							console.log(err);
						}

					});
				}

		}
	}
	//	If not login data found send http status 401
	else {
		console.log("No login data found!");
		//	Send http 401 status
		try {
			res.sendStatus(401);
		} catch(err) {
			//	If server error occurs, send status code 500
			console.log(err);
			res.sendStatus(500);
		}
	}
});

//	Handle logout requests
app.get("/ausloggen", function (req, res) {
	console.log("logout attempt");
	if (req.session.UID !== null) {
		try {
			console.log("Logging out " + req.session.UID);
			console.log("User status: " + req.session.status);
			//	Set user status and ids to null
			req.session.dbId = null;
			req.session.status = null;
			req.session.UID = null;
			//	Set cookie to expire
			req.session.cookie.expires = new Date(0);
			res.sendFile(__dirname + '/HTML/ausloggen.html');
		} catch(err) {
			//	Send status code for internal server error
			res.sendStatus(500);
			console.log(err);
		}
	}
	else {
		res.redirect("/");
	}
});

app.post("/patientSearch", function (req, res) {

});

app.post("/patientCreate", function (req, res) {

});

app.get("/patientList", function (req, res) {

});

app.get("/getPats", function (req, res) {
	if (req.session.status === "psychologist" && req.session.UID !== null) {
		console.log("Retrieving patient list for psychologist startPage");
		let sqlStringPat = "SELECT Vorname, Nachname, Notiz FROM Patient a, Tagebuch b WHERE a.PatientenID=b.PatientenID AND b.Notiz NOT NULL";
		//	Mysql query handler function returns false if not found and true if found;
		con.query(sqlStringPat, async function(err, result) {
			try {
				await console.log(result);
				for (let i = 0; i < result.length; i++) {
					if (result[i].Username === usr && result[i].passworthash === pwHash) {
						//	Save patient id in cookie
						req.session.dbId = result[i].PatientenID;
						//	Generate unique time-based id for logged-in user and save in session cookie
						req.session.UID = uuid.v1();
						req.session.status = "patient";
						await notfound = false;
						await res.sendFile(__dirname + '/HTML/tagebuch.html');
						return true;
					}
				}
				//	Patient not found
				if (notfound) {
					await console.log("No patient found");
					//	Send http 401 status
					await res.sendStatus(401);
					return false;
				}

			}
				//	Catch error during query handling
			catch (err) {
				console.log(err);
			}
		});

	}
	else {
		console.log("Can´t retrieve patient list without psychologist credentials");
		res.sendStatus(401);
		if (req.session.status === "patient"){
			res.sendFile(__dirname + '/HTML/tagebuch.html');
		}
	}
});

app.use(express.static('HTML'));



var options = {
	key: fs.readFileSync('KEY/key.pem'),
	cert: fs.readFileSync('KEY/certificate.pem')
};

https.createServer(options, app).listen(8080);// "Startet den Server, weist Port 8080 zu
console.log('Server started, listening at port 8080'); //Gibt 'Server started, listening at port 8080' aus 