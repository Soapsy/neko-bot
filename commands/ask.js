exports.run = (client, message, args) => {
  if(args[0] && !message.author.bot)
  {
    
    const emoji = message.guild.emojis.random();
	const randcha = require('../data/answers.json');
	const leng = randcha.length + 1;
	const rnd = Math.floor(Math.random() * (leng - 0));
    const rnd2 = Math.floor(Math.random() * (3 - 0));
    let reply = randcha[rnd];
    if(rnd2 == 0){
      reply += " " + emoji;
    }
    message.channel.send(reply).catch(console.error);
  }
}