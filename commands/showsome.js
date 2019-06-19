exports.run = (client, message, args) => {
  //if(message.guild.id != process.env.HOMESERVER)return;
  if(!message.author.bot)
  {
    var lines = [];
    const fs = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
  input: fs.createReadStream('pits.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
lines.push(line);
});
    
    var link = lines[Math.floor(Math.random()*lines.length)];
    console.log(link + " link");
    message.channel.send(link).catch(console.error);
  }
}