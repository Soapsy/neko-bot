exports.run = (client, member, user) => {
const Discord = require(`discord.js`);
if(member.guild.id != process.env.HOMESERVER)return;
const channel = member.guild.channels.find(ch => ch.name === 'new-members');
if (!channel || !member) return;
  const randclr = Math.floor(Math.random() * 16777214) + 1;
  const greeting = new Discord.RichEmbed()
  .setTitle(`${member.user.username} присоединился(ась) к нам!`)
  .setColor(randclr)
  .setThumbnail(member.user.avatarURL)
  .setDescription(`Добро пожаловать!\nНадеемся, тебе здесь понравится <:kohacomfy:889121394611343390>`)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setFooter(`Теперь нас  ${member.guild.memberCount}`);
  channel.send(greeting).catch(console.error);
}