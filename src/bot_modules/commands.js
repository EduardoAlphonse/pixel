const config = require('../../config.json');
const client = require('../client');

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'server') {
		return message.channel.send(`Este servidor se chama ${message.guild.name}.\nFoi criado em ${message.guild.createdAt}\nPossui ${message.guild.memberCount} membros.`);

	}

	if (command === 'ping') {
		return message.channel.send('Pong 🏓');

	}

	if (command === 'beep') {
		return message.channel.send('Boop!');

	}

	if (command === 'user-info') {
		console.log(message.author);
		console.log(message.author.avatarURL());
		return message.reply(`aqui estão suasinformações:\nNome de usuário: ${message.author.username}\nID: ${message.author.id}`);

	}

	if (command === 'args-info') {
		if (!args.length) {
			console.log(args);
			message.channel.send('Você não passou nenhum argumento.');
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Args: ${args}.`);
		return message.channel.send(`Primeiro argumento: ${args[0]}.`);
	}

	if (command === 'kick') {
		const taggedUser = message.mentions.users.size;

		return taggedUser ?
			message.channel.send(`Você quis banir ${taggedUser}.`) :
			message.channel.send(`Você precisa mencionar um usuário para bani-lo.`);
	}

	if (command === 'avatar') {
		const mentionsSize = message.mentions.users.size;

		if (!mentionsSize) {
			message.reply(`seu avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })}`);
		} else {
			const mentions = message.mentions.users;

			const response = mentions.map(mention => {
				return `Avatar de ${mention.username}: ${mention.displayAvatarURL({ format: 'png', dynamic: true, size: 256 })}`;
			});

			return message.channel.send(response);
		}
	}
});