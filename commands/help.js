exports.run = (client, message, args) => {
  if(message.author.bot)return;
  if(message.guild.id != process.env.HOMESERVER)
  {
    message.channel.send(`Минерва v1.4\n \nДоступные команды:\nask [вопрос] - твой личный 8ball\n
choose [a, b, c] - поможет с трудным выбором\nping - не надо
).catch(console.error);
}