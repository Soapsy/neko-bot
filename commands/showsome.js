exports.run = (client, message, args) => {
  //if(message.guild.id != process.env.HOMESERVER)return;
  if(!message.author.bot)
  {
    const fs = require('fs');
    fs.readFile('../data/ping.txt', function(err, data){
    if(err) throw err;
    var lines = data.split('\n');
    var link = lines[Math.floor(Math.random()*lines.length)];
    message.channel.send(link).catch(console.error);
  })}
}