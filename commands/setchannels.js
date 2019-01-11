exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
  const config = require('../config.json');
    if (message.author.id === config.ownerID) {
        if ((message.guild.channels.some(chan => chan.name === "role-management")) || (message.guild.channels.some(chan => chan.name === "host-list"))) {
            message.channel.send("Channels already set").then(msg => {
                msg.delete(10000)
            }).catch(console.error);
        } else {
            message.guild.createChannel("role-management", 'text', [{
                id: message.guild.id,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
            }]).catch(console.error);
            message.guild.createChannel("host-list", 'text', [{
                id: message.guild.id,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
            }]).catch(console.error);
            message.channel.send("Channels are set up").catch(console.error);
        }
    }
}