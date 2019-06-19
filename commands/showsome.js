exports.run = (client, message, args) => {
  //if(message.guild.id != process.env.HOMESERVER)return;
  if(!message.author.bot)
  {
    var lines;
    const fs = require('fs');
    const readline = require('readline');

    async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
      
      lines+=line;
  }
}

processLineByLine();
    
    var link = lines[Math.floor(Math.random()*lines.length)];
    message.channel.send(link).catch(console.error);
  })}
}