exports.run = (client, member, user) => {
const RichEmbed = require(`discord.js`);
const channel = member.guild.channels.find(ch => ch.name === 'general');
if (!channel || !member) return;
  const greeting = new RichEmbed();
  
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