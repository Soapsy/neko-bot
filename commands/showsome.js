exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
  if(args[0] && !message.author.bot)
  {
    
    
     fs.readFile('data/ping.txt', function(err, data){
    if(err) throw err;
    var lines = data.split('\n');
    vlines[Math.floor(Math.random()*lines.length)];
       
	const randcha = require('../data/answers.json');
	const leng = randcha.length + 1;
	const rnd = Math.floor(Math.random() * (leng - 0));
    const rnd2 = Math.floor(Math.random() * (3 - 0));
    let reply = randcha[rnd];
    if(rnd2 == 0 && emoji){
      reply += " " + emoji;
    }
    message.channel.send(reply).catch(console.error);
  }
}