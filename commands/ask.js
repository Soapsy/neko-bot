exports.run = (client, message, args) => {
	const randcha = require('../data/answers.json');
	const leng = randcha.length + 1;
	const rnd = Math.floor(Math.random() * (leng - 0));
	const reply = randcha[rnd];
    message.channel.send(reply).catch(console.error);
}