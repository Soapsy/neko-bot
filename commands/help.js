exports.run = (client, message, args) => {
  if(message.author.bot)return;
  if(message.guild.id == process.env.HOMESERVER)
{
    message.channel.send(`**Minerva v1.4**\n \nДоступные команды:\n
ask [вопрос] - твой личный 8ball
choose [a, b, c] - life-changing decisions
ping - не надо
randchar - выбор мейна(вайфу)
register [steamurl] - регистрация для последующего хостинга
host - создает ссылку на лобби в #host-list
unhost - убирает ссылку на лобби`
).catch(console.error);
}
  else if(message.guild.id != process.env.HOMESERVER)
  {
    message.channel.send(`**Minerva v1.4**\n \nCommand list:\n
register [steamurl] - sign up for future hosting\nhost - creates a lobby link in #host-list\nunhost - stops hosting`).catch(console.error);
  }
}