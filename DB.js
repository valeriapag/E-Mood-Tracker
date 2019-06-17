/*var MongoClient = require('mongodb').MongoClient; //Das Modul mongodb wird geladen
var url1 = "mongodb://localhost:27017/EMoodTracker"; //URL zum localhost mit der Portnummer 27017 und Database
var url = "mongodb://localhost:27017";	//URL zum localhost mit der Portnummer 27017

MongoClient.connect(url1, function(err, db) { //Datenbankverbindug zur URL erstellen.
	if (err) throw err; //Errorabfrage ob Verbindung zur Datenbank steht.
	console.log("Database created!"); //Ausgabe das Database erstellt wurde.
	db.close();
});

MongoClient.connect(url, function(err, db){  //Datenbankverbindug zur URL erstellen.
	if (err) throw err; //Errorabfrage ob Verbindung zur Datenbank steht.
	var dbo = db.db("EMoodTracker");
	dbo.collection("Patient", function(err,res){ //Erstellung der Collection Patient
		if (err) throw err; //Errorabfrage ob Collection erstellt wurde
		console.log("Patient Collection created!"); //Ausgabe bei erfolgreicher Erstellung von Collection
	});
	dbo.collection("Patientenlogin", function(err,res){ //Erstellung der Collection Patientenlogin
		if (err) throw err; //Errorabfrage ob Collection erstellt wurde
		console.log("Patientenlogin Collection created!"); //Ausgabe bei erfolgreicher Erstellung von Collection
	});
	dbo.collection("Tagebuch", function(err,res){ //Erstellung der Collection Tagebuch
		if (err) throw err; //Errorabfrage ob Collection erstellt wurde
		console.log("Tagebuch Collection created!"); //Ausgabe bei erfolgreicher Erstellung von Collection
	});
	dbo.collection("Psychologe", function(err,res){ //Erstellung der Collection Psychologe
		if (err) throw err; //Errorabfrage ob Collection erstellt wurde
		console.log("Psychologe Collection created!"); //Ausgabe bei erfolgreicher Erstellung von Collection
	});
	dbo.collection("Psychologenlogin", function(err,res){ //Erstellung der Collection Psychologenlogin
		if (err) throw err; //Errorabfrage ob Collection erstellt wurde
		console.log("Psychologenlogin Collection created!"); //Ausgabe bei erfolgreicher Erstellung von Collection
	});
	db.close(); //beenden der Datenbankverbindung
});
*/

var mysql = require('mysql');
/*
var con1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});
*/
var con1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "EMoodTracker"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE EMoodtracker", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  var sql = "CREATE TABLE Patient (PatientenID VARCHAR(25), Vorname VARCHAR(25), Nachname VARCHAR(25), Geburtsdatum Date, Geburtsort VARCHAR(25), Adresse VARCHAR(255), Email VARCHAR(25), PsychologenID VARCHAR(25))";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient Table created");
  });
  var sql1 = "CREATE TABLE Patientenlogin (PatientenID VARCHAR(25), Username VARCHAR(25), Passworthash VARCHAR(25))";
  con1.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Patientenlogin Table created");
  });
  var sql2 = "CREATE TABLE Tagebuch (PatientenID VARCHAR(25), TagebuchID VARCHAR(25), Notiz VARCHAR(25), Stimmung Integer, Schlafstimmung Integer, Datum Date)";
  con1.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Tagebuch Table created");
  });
  var sql3 = "CREATE TABLE Psychologe (PsychologenID VARCHAR(25), Vorname VARCHAR(25), Nachname VARCHAR(25), Geburtsdatum Date, Geburtsort VARCHAR(25), Adresse VARCHAR(255), Email VARCHAR(25))";
  con1.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Psychologe Table created");
  });
  var sql4 = "CREATE TABLE Psychologenlogin (PsychologenID VARCHAR(25), Username VARCHAR(25), Passworthash VARCHAR(25))";
  con1.query(sql4, function (err, result) {
    if (err) throw err;
    console.log("Psychologenlogin Table created");
  });
});