exports.run = (client, reaction, user) => {
if (user.bot) return;
const msg = reaction.message;
const txt = msg.content;
const chn = msg.channel;
let roleName;
  if(message.content.startsWith("@"))
  {
    roleName = msg.content.slice(1
const roleText = msg.content.replace("@", "");
  console.log(roleText);
if(chn.type === "text" && chn.name.toLowerCase() === "role-management"){
		const roleObj = msg.guild.roles.find(r => r.name === roleText);
		if(!roleObj) return;
		const memberObj = msg.guild.members.get(user.id);
		if(!memberObj) return;
		memberObj.addRole(roleObj).catch(console.error);
		console.log('a reaction has been added');
}}