exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
	var text = args.join(" ");
    message.channel.send(text).then(message.delete()).catch(console.error);
}