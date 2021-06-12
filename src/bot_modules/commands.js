const config = require('../../config.json');
const client = require('../client');

const getUserFromMention = (mention) => {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

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
		return message.reply(`aqui estão suasinformações:\nNome de usuário: ${message.author.username}\nID: ${message.author.id}`);

	}

	if (command === 'args-info') {
		if (!args.length) {
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
		if (args[0]) {
			const user = getUserFromMention(args[0]);

			if (!user) {
				return message.reply('Por favor, mencione alguém corretamente para ver seu avatar.');
			}

			return message.channel.send(`Avatar de ${user.username}: ${user.displayAvatarURL({ dynamic: true, size: 256 })}`);
		}

		return message.channel.send(`${message.author.username}, seu avatar: ${message.author.displayAvatarURL({ dynamic: true, size: 256 })}`);
	}

	if (command === 'prune') {
		if (!args[0]) {
			return message.channel.send('Você precisa especificar o número de mensagens que serão deletadas.');
		}

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send('Você precisa informar um número válido entre 2 e 100.');
		}

		if (amount < 2 || amount > 100) {
			return message.channel.send('O número de mensagens a serem deletadas precisa ser entre 2 e 100.');
		}

		return message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Houve um erro ao tentar deletar mensagens nesse canal.');
		});
	}
});