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
//	Generate ids with unique id (uuid) module
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

con.connect(function(err){	
				if (err) throw err;
});

//	Configure bodyparser for use with json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//	Set view folder and engine to render patient list
app.set("views", __dirname + "/HTML/views");
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set("view engine", "hbs");

//	Set session cookies
app.use(session({
	UID: null,
	status: null,
	dbId: null,
	secret: 'red sea',
	name : 'sessToken',
	resave: false,
	saveUninitialized: false
}));

//	Handle get request for login page
app.get("/", function(req, res) {
		if (req.session.UID != null) {
			console.log("Already logged in as " + req.session.status);
			res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
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
		if (req.session.UID != null) {
			console.log("Already logged in as " + req.session.status);
			res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
		}
		else {
			//	Get username and password from http body
			let usr = req.body.user;
			let pwHash = req.body.password;
			//	SQL search strings for two login types
			let sqlStringPat = "SELECT Username,passworthash,PatientenID FROM Patientenlogin";
			let sqlStringPsych = "SELECT Username,passworthash,PsychologenID FROM Psychologenlogin";
			let notfound = true;

			//	Mysql query handler function returns false if not found and true if found;
			con.query(sqlStringPat, async function(err, result){
				try {
					await console.log(result);
					for (let i = 0; i < result.length; i++) {
						if (result[i].Username == usr && result[i].passworthash == pwHash) {
							//	Save patient id in cookie
							req.session.dbId = result[i].PatientenID;
							//	Generate unique time-based id for logged-in user and save in session cookie
							req.session.UID = uuid.v1();
							req.session.status = "patient";
							notfound = false;
							console.log("Patient found, logging in ID " + req.session.dbId);
							//await res.redirect("/startPage");
							res.sendFile(__dirname + '/HTML/tagebuch.html');
							break;
						}
					}
					//	Patient not found
					if (notfound) {
						console.log("Not a patient");
					}

				}
				//	Catch error during query handling
				catch(err) {
					console.log(err);
				}
			});
			//	Check if a patient has been found, if not continue searching
			console.log(res.headersSent);
			if (notfound == true)
			{
				con.query(sqlStringPsych, async function(err, result){
					//	Same procedure as with patient
					try {
						await console.log(result);
						for(let i = 0; i < result.length; i++){
							if(result[i].Username == usr && result[i].passworthash == pwHash){
								//	Save psychologist id in cookie
								req.session.dbId = result[i].PsychologenID;
								//	Generate unique time-based id for logged-in user and save in session cookie
								req.session.UID = uuid.v1();
								req.session.status = "psychologist";
								notfound = false;
								console.log("Psychologist found, logging in ID " + req.session.dbId);
								//await res.redirect('/startPage');
								res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
								break;
							}
						}
						if (notfound) {
							await console.log("No psychologist found");
							//	Send http 401 status
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

app.post("/getSave", function (req, res){
	console.log("Trying to save patient data");
	var datum = new Date();
	var heute = datum.getDate() + "/" + (datum.getMonth()+ 1)+"/" + datum.getFullYear();
	var insString = "'" + req.session.dbId + "'" + "," + "'" + "Notiz" + "'" + "," + "'" + req.body.stimmung +  "'" + "," + "'" + req.body.schlafstimmung + "'" + "," + "'" + heute + "'";
	console.log(insString);
	var sqlString = "INSERT INTO tagebuch (PatientenID, Notiz, Stimmung, Schlafstimmung, Datum) VALUES (" + insString + ")";
	console.log(sqlString);
	con.query(sqlString,function(err,result){
		if(err) throw err;
	});
});
/*
app.get("/startPage", async function (req, res) {
	console.log(req.session);
	if (req.session.status === "psychologist") {
		await console.log("psychologist");
		await res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
	}
	else if (req.session.status === "patient") {
		await console.log("patient");
		await res.sendFile(__dirname + '/HTML/tagebuch.html');
	}else{
		res.redirect("/");
	}
});
*/
//	Handle logout requests
app.get("/ausloggen", function (req, res) {
	console.log("logout attempt");
			console.log("Logging out " + req.session.dbId);
			console.log("User status: " + req.session.status);
			//	Set user status and ids to null
			req.session.dbId = null;
			req.session.status = null;
			req.session.UID = null;
			//	Set cookie to expire
			req.session.cookie.expires = new Date(0);
			res.sendFile(__dirname + '/HTML/ausloggen.html');

});

//	Handle patient search requests
app.post("/patientSearch", async function (req, res) {
	await console.log("Request for patient search received");
	await console.log(req.body);
	//	Collect values from request JSON
	var map = await {
		Nachname: req.body.Nachname,
		Vorname: req.body.Vorname,
		Geburtsdatum: req.body.Geburtsdatum,
		Krankheit: req.body.Krankheit,
		Geschlecht: req.body.Geschlecht
	};
	//	Construct sql query string
	let sqlQueryTemp = "SELECT * FROM Patient WHERE ";
	let str = "";
	let count = 0;
	var Keys = Object.keys(map);
	console.log(Keys);
	for (m in Keys){
		if (map[Keys[m]] === "" || map[Keys[m]] === undefined) {
			//	Don´t add to string array

			//	Check if all values are undefined
			count++;
		}
		else {
			console.log(Keys[m]);
			str = String(Keys[m]) + "='" + String(map[Keys[m]]) + "'";
			sqlQueryTemp = sqlQueryTemp + str + " AND ";
		}
	}
	if (count == 5) {
		//	If all values are undefined
		console.log("No input values");
		res.sendStatus(401);
	}
	else {
		console.log(sqlQueryTemp);
		let len = await sqlQueryTemp.length;
		let sqlQuery = await sqlQueryTemp.slice(0,len-5);
		sqlQuery = await sqlQuery.trim();
		await console.log(sqlQuery);
		await console.log("Retrieving data for patient search");
		con.query(sqlQuery, async function(err, result){
			//	Same procedure as with patient
			try {
				await console.log(result);
				var final = await JSON.stringify(result);
				await res.send(final);
			}
				//	Catch error during query handling
			catch (err) {
				await console.log(err);
			}
		});
	}
});

app.post("/patientCreate", function (req, res) {
	console.log("Request for create patient received");
	//	Collect values from request JSON

	//	Patient Info
	let map = {
		Nachname: req.body.name,
		Vorname: req.body.vorname,
		Geburtsdatum: req.body.gbdatum,
		Krankheit: req.body.krankheit,
		Geschlecht: req.body.gender,
		GeburtsOrt: req.body.gbort,
		Strasse: req.body.strasse,
		Hausnummer: req.body.hausnummer,
		PLZ: req.body.plz,
		Ort: req.body.ort,
		Email: req.body.email,
		patientId: uuid.v1(),
		psychID: req.session.dbId
	};

	//	Patient login info
	let pw = req.body.password;
	let login = {
		PatientenID: uuid.v1(),
		Username:  req.body.username,
		Passworthash: md5(pw)
	};
	//	Insert patient and login info into DB
	let sqlQueryPat = "INSERT INTO Patient (PatientenID, Vorname , Nachname,Geburtsdatum, Geburtsort, Strasse, Hausnummer, PLZ, Ort, Email,Geschlecht, Krankheit, PsychologenID) VALUES ('" + map.patientId + "','" + map.Vorname + "','" + map.Nachname + "','" + map.Geburtsdatum + "','" + map.GeburtsOrt + "','" + map.Strasse + "','" + map.Hausnummer + "','" + map.PLZ + "','" + map.Ort + "','" + map.Email + "','" + map.Geschlecht + "','" + map.Krankheit + "','" + map.psychID + "')";
	let sqlQueryLogin = "INSERT INTO Patientenlogin (PatientenID, Username , Passworthash) VALUES ('" + map.patientId + "','" + login.Username + "','" + login.Passworthash +"')";
	console.log("Creating patient");
	con.query(sqlQueryPat, async function(err, result){
		//	Same procedure as with patient
		try {
			await console.log(result);
		}
			//	Catch error during query handling
		catch (err) {
			await console.log(err);
			res.sendStatus(500);
		}

	});

	con.query(sqlQueryLogin, async function(err, result){
		//	Same procedure as with patient
		try {
			await console.log(result);
		}
			//	Catch error during query handling
		catch (err) {
			await console.log(err);
			res.sendStatus(500);
		}

	});
	//	Redirect back to Startpage
	res.redirect("/startPage");
});

app.get("/cancel", function (req, res) {
	res.sendFile(__dirname + '/HTML/tagebuch.html');
});

app.get("/patientID", function (req, res) {

});

app.get("/toSearchPage", async function (req, res) {
	console.log("Redirecting to search page");
	res.redirect("/sPage")
});

app.get("/sPage", async function (req, res) {
	res.sendFile(__dirname + '/HTML/patientensuche.html');
});

app.get("/toPatientList", async function (req, res) {
	console.log("Redirecting to search page");
	res.redirect("/sPage")
});



app.get("/getPats", function (req, res) {
	console.log("Trying to get patient notes");
	if (req.session.status == "psychologist" && req.session.UID != null) {
		console.log("Retrieving patient list for psychologist startPage");
		let sqlStringPat = "SELECT Vorname, Nachname, Notiz FROM Patient a, Tagebuch b WHERE a.PatientenID=b.PatientenID AND b.Notiz IS NOT NULL";
		//	Mysql query handler function returns false if not found and true if found;
		con.query(sqlStringPat, async function(err, result) {
			try {
				await console.log(result);
				await res.send(result);
			}
				//	Catch error during query handling
			catch (err) {
				await console.log(err);
			}
		});
	}
	else {
		console.log("Can´t retrieve patient list without psychologist credentials");
		res.sendStatus(401);
		if (req.session.status == "patient"){
			res.sendFile(__dirname + '/HTML/tagebuch.html');
		}
	}
});

app.post("/patientDiag", function (req, res) {
	//
});


app.use(express.static('HTML'));



var options = {
	key: fs.readFileSync('KEY/key.pem'),
	cert: fs.readFileSync('KEY/certificate.pem')
};

https.createServer(options, app).listen(8080);// "Startet den Server, weist Port 8080 zu
console.log('Server started, listening at port 8080'); //Gibt 'Server started, listening at port 8080' aus 