exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
    message.channel.send("шо да ты заiбав").catch(console.error);
}