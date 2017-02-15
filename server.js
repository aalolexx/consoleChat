//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Decrypter
function decrypt (data) {
	var decrypted;

	decrypted = data;

	decrypted = decrypted.replace("!", "a");
	decrypted = decrypted.replace("'", "b");
	decrypted = decrypted.replace("?", "c");
	decrypted = decrypted.replace("#", "d");
	decrypted = decrypted.replace(";", "e");
	decrypted = decrypted.replace("6", "f");
	decrypted = decrypted.replace("5", "g");
	decrypted = decrypted.replace("1", "h");
	decrypted = decrypted.replace("3", "i");
	decrypted = decrypted.replace("$", "j");
	decrypted = decrypted.replace("é", "k");
	decrypted = decrypted.replace("ü", "l");
	decrypted = decrypted.replace("4", "m");
	decrypted = decrypted.replace("9", "n");
	decrypted = decrypted.replace("<", "o");
	decrypted = decrypted.replace(">", "p");
	decrypted = decrypted.replace("£", "q");
	decrypted = decrypted.replace("_", "r");
	decrypted = decrypted.replace(".", "s");

	return decrypted;
}

var currentdate = new Date();

io.on('connection', function (socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
    socket.broadcast.emit('CH01',from, msg);

    if (decrypt(msg).startsWith("@CHATBOT")) {
    	
    	if (decrypt(msg).indexOf("users online") >= 0) {
    		io.sockets.emit('CH01',"CHATBOT", "Users in room: " + io.engine.clientsCount);
    	}

    	if (decrypt(msg).indexOf("my name") >= 0) {
    		io.sockets.emit('CH01',"CHATBOT", "Your name is: " + from);
    	}

    } else {}

  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});