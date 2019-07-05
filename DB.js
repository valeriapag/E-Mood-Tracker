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
  var sql = "CREATE TABLE Patient (PatientenID VARCHAR(50), Vorname VARCHAR(50), Nachname VARCHAR(50), Geburtsdatum Date, Geburtsort VARCHAR(50), Strasse VARCHAR(50), Hausnummer Integer, PLZ VARCHAR(10), Ort VARCHAR(50), Email VARCHAR(50),Geschlecht VARCHAR(50), Krankheit VARCHAR(50), PsychologenID VARCHAR(50))";
  con1.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient Table created");
  });
  var sql1 = "CREATE TABLE Patientenlogin (PatientenID VARCHAR(50), Username VARCHAR(50), Passworthash VARCHAR(50))";
  con1.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Patientenlogin Table created");
  });
  var sql2 = "CREATE TABLE Tagebuch (PatientenID VARCHAR(50), med VARCHAR(10), Notiz VARCHAR(50), Stimmung Integer, Schlafstimmung Integer, Datum VARCHAR(15))";
  con1.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Tagebuch Table created");
  });
  var sql3 = "CREATE TABLE Psychologe (PsychologenID VARCHAR(50), Vorname VARCHAR(50), Nachname VARCHAR(50), Geburtsdatum Date, Geburtsort VARCHAR(50), Strasse VARCHAR(50), Hausnummer Integer, PLZ VARCHAR(10), Ort VARCHAR(50), Email VARCHAR(50))";
  con1.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Psychologe Table created");
  });
  var sql4 = "CREATE TABLE Psychologenlogin (PsychologenID VARCHAR(50), Username VARCHAR(50), Passworthash VARCHAR(50))";
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
