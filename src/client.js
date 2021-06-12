const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log(`${client.user.username} is here! 🤖`);
});

client.login(config.token);

module.exports = client;