exports.run = (client, member, user) => {
const Discord = require(`discord.js`);
const channel = member.guild.channels.find(ch => ch.name === 'general');
if (!channel || !member) return;
  const randclr = Math.floor(Math.random() * 16777214) + 1;
  const greeting = new Discord.RichEmbed()
  .setTitle('New member joined')
  .setColor(randclr)
  .setThumbnail()
  .setDescription(`${member.nickname}+ присоединился(ась) к нам!`)
  .setAuthor(client.user)
  .setFooter(`Теперь нас: ${membercount}`)
  
  
const msg = reaction.message;
const txt = msg.content;
const chn = msg.channel;
if(chn.type === "text" && chn.name.toLowerCase() === "role-management"){
		const roleObj = msg.guild.roles.find(r => r.name === msg.content);
		if(!roleObj) return;
		const memberObj = msg.guild.members.get(user.id);
		if(!memberObj) return;
		memberObj.addRole(roleObj).catch(console.error);
		console.log('a reaction has been added');
}}