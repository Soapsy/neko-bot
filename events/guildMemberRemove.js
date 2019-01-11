exports.run = (client, member, user) => {
  if(member.guild.id != process.env.HOMESERVER)return;
const channel = member.guild.channels.find(ch => ch.name === 'general');
  if(channel)channel.send(`**${member.user.username}** покинул нас.\nПомянем <:musad:457860678133219328>`).catch(console.error);
}