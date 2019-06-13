exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
    const owo = args.length;
    const uwu = Math.floor(Math.random() * (owo - 0));
    const wuw = uwu;
    const reply = args[wuw];
    message.channel.send('**I choose:** ' + reply + '!').catch(console.error);
}