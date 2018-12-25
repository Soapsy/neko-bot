exports.run = (client, member, user) => {
const channel = member.guild.channels.find(ch => ch.name === 'general');
  if(channel)channel.send(`**${member.user.username}** покинул нас.\nПомянем <:musad:457860678133219328>`).catch(console.error);
}