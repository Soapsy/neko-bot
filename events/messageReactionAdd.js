exports.run = (client, reaction, user) => {
if (user.bot) return;
const msg = reaction.message;
const chn = msg.channel;
  let roleName;
              if(msg.content.startsWith("\@"))
              {
                roleName = msg.content.slice(1);
              }
              else
              {
                roleName = msg.content;
              }
              console.log(roleName + " role name");
if(chn.type === "text" && chn.name.toLowerCase() === "role-management"){
		const roleObj = msg.guild.roles.find(r => r.name === roleName);
		if(!roleObj) return;
		const memberObj = msg.guild.members.get(user.id);
		if(!memberObj) return;
		memberObj.addRole(roleObj).catch(console.error);
		console.log('a reaction has been added');
}}