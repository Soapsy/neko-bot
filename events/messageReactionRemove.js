exports.run = (client, reaction, user) => {
if (user.bot) return;
const msg = reaction.message;
const txt = msg.content;
const chn = msg.channel;
if(chn.type === "text" && chn.name.toLowerCase() === "role-management"){
		const roleObj = msg.guild.roles.find(r => r.name === txt);
		if(!roleObj) return;
		const memberObj = msg.guild.members.get(user.id);
		if(!memberObj) return;
		memberObj.removeRole(roleObj).catch(console.error);
		console.log('a reaction has been removed');
}
}