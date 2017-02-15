//client.js
var io = require('socket.io-client');
var chalk = require('chalk');
var colorReadline = require('node-color-readline');
var socket = io.connect('http://localhost:3000', {reconnect: true});;
const readline = require('readline');
var name = "noname";

var isAuthorized = 0;

//Helpers
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function encrypt (data) {
	var enrypted;

	enrypted = data;

	enrypted = enrypted.replace("a", "!");
	enrypted = enrypted.replace("b", "'");
	enrypted = enrypted.replace("c", "?");
	enrypted = enrypted.replace("d", "#");
	enrypted = enrypted.replace("e", ";");
	enrypted = enrypted.replace("f", "6");
	enrypted = enrypted.replace("g", "5");
	enrypted = enrypted.replace("h", "1");
	enrypted = enrypted.replace("i", "3");
	enrypted = enrypted.replace("j", "$");
	enrypted = enrypted.replace("k", "é");
	enrypted = enrypted.replace("l", "ü");
	enrypted = enrypted.replace("m", "4");
	enrypted = enrypted.replace("n", "9");
	enrypted = enrypted.replace("o", "<");
	enrypted = enrypted.replace("p", ">");
	enrypted = enrypted.replace("q", "£");
	enrypted = enrypted.replace("r", "_");
	enrypted = enrypted.replace("s", ".");

	return enrypted;
}

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


socket.on('CH01', function (from, msg) {
	if (isAuthorized == 1) {
		if (from == "CHATBOT") {
			console.log(chalk.yellow(decrypt(from) + ': ' + decrypt(msg)));
		} else {
			console.log(chalk.magenta(decrypt(from) + ': ' + decrypt(msg)));
		}
	}
});

const roompw = "-1349034542";

const rl = colorReadline.createInterface({
  input: process.stdin,
  output: process.stdout,
  colorize: function (str) {
    // Make all occurences of 'e' red. 
    return str.replace(/.*/g, function (match) {
      return chalk.cyan(match);
    });
  }
});

rl.question('Roompassword: ', (answer) => {
 
 if (answer.hashCode() == roompw) {

 	rl.question('Name: ', (answer) => {
		name = answer;
		authorize();
	});
 	
 } else {
 	console.log(chalk.red("no"));
 }

});

function authorize() {
	isAuthorized = 1;
	sendMessage("CH01", "CHATBOT", (name + ' connected with room'));
	readL();
}

function sendMessage(channel, from, msg) {
	socket.emit(channel, encrypt(from), encrypt(msg));
	readL();
}

function readL() {
	rl.question('', (answer) => {
	 
		sendMessage("CH01", name, answer);

	});
}
