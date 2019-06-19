//var StaticServer = require('node-static'); //Das Modul node-static für den Statischen Server wird geladen
//var file = new StaticServer.Server('./HTML'); //Die Dateien befinden sich auf dem statischen Server im Ordner public. (In diesem Fall die HTML-Dateien für unseren Webseite)
var https = require('https');
var fs = require('fs');
//Modul Express wird eingebunden
var express = require("express");
//Modul Handlebars für Express wird eingebunden
var hbs = require("express-handlebars");
//app wird für Konfiguration des Servers verwendet
var app = express();
var bodyparser = require('body-parser');
var session = require('express-session');
//	Generate ids
//var uuid = require('uuid');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "EMoodTracker"
});

con.connect(function(err){	
				if (err) throw err;
});

//Benutze Bodyparser zum Zugriff auf gepostete Daten
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Views Pfad für die View Engine
app.set("views", __dirname + "/views");
//Kofigurieren der View Engine, Datei-Endung 'hbs'
app.engine('.hbs', hbs({extname: '.hbs'}));
//"hbs" wird als View Engine festgelegt
app.set("view engine", "hbs");

app.use(session({
	secret: 'red sea',
	name : 'sessToken',
	resave: false,
	saveUninitialized: false
}));
/*
function handleRequest (request, response) { //Eventhandler für ankommende Anfragen
	//console.log ist die Ausgabemethode in der Konsole
	console.log('Request received'); //Gibt 'Request received' aus 
	console.log('Method: ' + request.method); // Gibt aus welche Methode verwendet wird, für das Abrufen der Webseite (GET-Methode)
	console.log('Http version: ' + request.httpVersion); // Gibt aus welche HTTP Version verwendet wird (Version 1.1)
	console.log('Pfad: ' + request.url); // Gibt in der statitschen Webseite aus welche Datei(Pfad) aufgerufen wird.
	console.log('Header: '); //Dient dazu, um zu sehen ab wann der Header anfängt
	console.log(request.headers); //Gibt den Inhalt vom Header aus

	request.addListener('end', function () { 
		file.serve(request, response);
    }).resume();
}

 */

//	Handle get request for login page
app.get("/", function(req, res) {
		if (0) {
			console.log("Bereits eingeloggt als " + req.session.status);
			res.redirect("/startPage");
		}
		else {
			res.sendFile(__dirname + '/HTML/login.html');
		}
});
//	Handle user login request
app.post("/loginAttempt", function(req, res) {
	if (req.body.user && req.body.password) {
		if (0) {
			console.log("Bereits eingeloggt als " + req.session.status);
			res.redirect("/");
		}
		else {
			console.log("Login");
			var usr = req.body.user;
			var pwHash = req.body.password;
			var sqlString = "SELECT Username,passworthash,PatientenID FROM Patientenlogin";		
			var sqlString1 = "SELECT Username,passworthash,PsychologenID FROM Psychologenlogin";	
				con.query(sqlString, async function(err, result){
					if (err) throw err;
					console.log(result);
					for(var i = 0; i < result.length; i++){
						if(result[i].Username == usr && result[i].passworthash == pwHash){
							res.sendFile(__dirname + '/HTML/tagebuch.html');
						} else if(result[i] == null){
							console.log("Kein Patient vorhanden!")
							break;
						}
					}
				});
				con.query(sqlString1, async function(err, result){
					if (err) throw err;
					console.log(result);
					for(var i = 0; i < result.length; i++){
						if(result[i].Username == usr && result[i].passworthash == pwHash){
							res.sendFile(__dirname + '/HTML/startseite-psychologe.html');
						} else if(result[i] == null){
							console.log("Kein Psychologe vorhanden!")
							break;
						}
					}
				});
		}
	}
});

app.get("/ausloggen", function (req, res) {
	if (req.session !== undefined) {
		try
		{
			console.log("Logge user " + req.session.status + " aus!");
			req.session.cookie.expires = new Date(0);
			res.sendFile(__dirname + '/HTML/ausloggen.html');
		}catch(e)
		{
			console.log(e);
		}
	}
	else {
		res.redirect("/startPage");
	}
});

app.get("/ausloggen", function (req, res) {

});

app.get("/ausloggen", function (req, res) {

});

app.get("/ausloggen", function (req, res) {

});

app.get("/ausloggen", function (req, res) {

});

app.use(express.static('HTML'));



var options = {
	key: fs.readFileSync('KEY/key.pem'),
	cert: fs.readFileSync('KEY/certificate.pem')
};

https.createServer(options, app).listen(8080);// "Startet den Server, weist Port 8080 zu
console.log('Server started, listening at port 8080'); //Gibt 'Server started, listening at port 8080' aus 