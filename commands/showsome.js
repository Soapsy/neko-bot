exports.run = (client, message, args) => {
  //if(message.guild.id != process.env.HOMESERVER)return;
  if(!message.author.bot)
  {
    
    	const randcha = require('../data/pits.json');
	    const leng = randcha.length + 1;
	    const rnd = Math.floor(Math.random() * (leng - 0));
      var reply = randcha[rnd];
      message.channel.send(reply).catch(console.error);
  }
}