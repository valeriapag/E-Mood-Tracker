var StaticServer = require('node-static'); //Das Modul node-static für den Statischen Server wird geladen
var file = new StaticServer.Server('./HTML'); //Die Dateien befinden sich auf dem statischem Server im Ordner public. (Indemfall die HTML-Dateien für unseren Webseite)
var https = require('https');
var fs = require('fs');

function handleRequest (request, response) { //Eventhändler für ankommende Anfragen
	//console.log ist die Ausgabemethode in der Konsole
	console.log('Request received'); //Gibt 'Request received' aus 
	console.log('Method: ' + request.method); // Gibt aus welche Methode verwendet wird, für das Abrufen der Webseite (GET-Methode)
	console.log('Http version: ' + request.httpVersion); // Gibt aus welche HTTP Version verwendet wird (Version 1.1)
	console.log('Pfad: ' + request.url); // Gibt in der statitschen Webseite aus welche Datei(Pfad) aufgerufen wird.
	console.log('Header: ') //Dient dazu, um zu sehen ab wann der Header anfangen tut.
	console.log(request.headers); //Gibt den Inhalt vom Header aus

	request.addListener('end', function () { 
		file.serve(request, response);
    }).resume();
}

var options = {
	key: fs.readFileSync('KEY/key.pem'),
	cert: fs.readFileSync('KEY/certificate.pem')
};

https.createServer(options, handleRequest).listen(8080);// "Startet den Server, weist Port 8080 zu
console.log('Server started, listening at port 8080'); //Gibt 'Server started, listening at port 8080' aus 