exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
    message.channel.send(
    `\`\`\`
『Rinjin』 - Today at 6:06 PM
I am not playin blues
thats 2nd from the bottom

『Rinjin』 - Today at 6:07 PM
I am yellow

『Rinjin』 - Today at 6:10 PM
and yeah, I am taking squares seriosly if they are above dark green, because it means something

『Rinjin』 - Today at 6:14 PM
more solid
plays better
\`\`\``).catch(console.error);
}