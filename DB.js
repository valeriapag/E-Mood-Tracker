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

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

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
  var sql = "CREATE TABLE Patient (PatientenID VARCHAR(25), Vorname VARCHAR(25), Nachname VARCHAR(25), Geburtsdatum Date, Geburtsort VARCHAR(25), Strasse VARCHAR(25), Hausnummer Integer, PLZ VARCHAR(10), Ort VARCHAR(25), Email VARCHAR(50),Geschlecht VARCHAR(25), Krankheit VARCHAR(25), PsychologenID VARCHAR(25))";
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
  var sql3 = "CREATE TABLE Psychologe (PsychologenID VARCHAR(25), Vorname VARCHAR(25), Nachname VARCHAR(25), Geburtsdatum Date, Geburtsort VARCHAR(25), Strasse VARCHAR(25), Hausnummer Integer, PLZ VARCHAR(10), Ort VARCHAR(25), Email VARCHAR(50))";
  con1.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Psychologe Table created");
  });
  var sql4 = "CREATE TABLE Psychologenlogin (PsychologenID VARCHAR(25), Username VARCHAR(25), Passworthash VARCHAR(25))";
  con1.query(sql4, function (err, result) {
    if (err) throw err;
    console.log("Psychologenlogin Table created");
  });
  
  var sql = "INSERT INTO Patient (PatientenID, Vorname , Nachname,Geburtsdatum, Geburtsort, Strasse, Hausnummer, PLZ, Ort, Email,Geschlecht, Krankheit, PsychologenID) VALUES ('200', 'Hans','Peter', 15/09/1996 , 'Reutlingen', 'Alteburgstrasse', 16, '73765', 'Reutlingen', 'Hans.peter@hotmail.de', 'Männlich', 'Depression',100)";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient inserted");
  });
  
  sql = "INSERT INTO Patientenlogin (PatientenID, Username , Passworthash) VALUES ('200', 'Peter', 'Hans')";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patientenlogin inserted");
  });
  
  sql = "INSERT INTO Psychologe (PsychologenID, Vorname , Nachname,Geburtsdatum, Geburtsort, Strasse, Hausnummer, PLZ, Ort, Email ) VALUES ('100', 'Dieter','Bohlen', 11/08/1963 , 'Metzingen', 'outletstrasse', 55, '73760', 'Metzingen', 'Dieter.Bohlen@KHtuebingen.de')";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Psychologe inserted");
  });
  
  sql = "INSERT INTO Psychologenlogin (PsychologenID, Username , Passworthash) VALUES ('100', 'Bohlen', 'Dieter')";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Pschologenlogin inserted");
  });
  con.end();
});
