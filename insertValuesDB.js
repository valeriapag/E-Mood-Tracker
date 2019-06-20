var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO Patient (PatientenID, Vorname , Nachname,Geburtsdatum, Geburtsort, Strasse, Hausnummer, PLZ, Ort, Email,Geschlecht, Krankheit, PsychologenID) VALUES ('300', 'Hans','Peter', 15/09/1996 , 'Reutlingen', 'Alteburgstrasse', 16, '73765', 'Reutlingen', 'Hans.peter@hotmail.de', 'Männlich', 'Depression',100)";
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