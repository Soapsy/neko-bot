exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
    message.channel.send(
    "https://i.imgur.com/rYy2s8W.jpg").catch(console.error);
}