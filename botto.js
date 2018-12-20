//environment values(ключи)
require('dotenv').config();

//зависимости
const fs = require("fs");
const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
const ownerID = config.ownerID;

const token = process.env.DISCORDAPITOKEN;

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//	проверка ответа от клиента		
client.on('ready', () => {console.log('I am ready!');});

//	цепляем эвенты
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	var count = 0;
	files.forEach(file => {
		let evFunc = require(`./events/${file}`);
		let evName = file.split(".")[0];
		client.on(evName, (...args) => evFunc.run(client, ...args));
		count++;
		 });
		 console.log('Successfully loaded ' + count + ' events');
});

// Turn bot off (destroy), then turn it back on
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('aaaaa')
    .then(msg => client.destroy())
    .then(() => client.login(token));
	
	client.on('ready', () => {
	console.log('Reboot finished');
	channel.send('finished');
});
}
// Log our bot in
client.login(token);
