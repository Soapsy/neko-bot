exports.run = (client, member, user) => {
  if(member.guild.id != process.env.HOMESERVER)return;
const channel = member.guild.channels.find(ch => ch.name === 'new-members');
  if(channel)channel.send(`**${member.user.username}** покинул нас.\nПомянем <:WOOSH:890927246951469116>`).catch(console.error);
}