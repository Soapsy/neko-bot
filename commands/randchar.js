exports.run = (client, message, args) => {
	const randcha = require('../data/chars.json');
	console.log(randcha);
	const leng = randcha.length + 1;
	const rnd = Math.floor(Math.random() * (leng - 0));
	const reply = randcha[rnd];
	var text = args.join(" ");
    message.channel.send(reply).catch(console.error);
}