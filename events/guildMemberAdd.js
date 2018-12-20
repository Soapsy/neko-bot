exports.run = (client, member, user) => {
const Discord = require(`discord.js`);
const channel = member.guild.channels.find(ch => ch.name === 'general');
if (!channel || !member) return;
  const randclr = Math.floor(Math.random() * 16777214) + 1;
  const greeting = new Discord.RichEmbed()
  .setTitle('New member joined')
  .setColor(randclr)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`${member.nickname}+ присоединился(ась) к нам!`)
  .setAuthor(client.user, client.user.avatarURL)
  .setFooter(`Теперь нас ${member.guild.memberCount}`);
  channel.send(greeting).catch(console.error);
}