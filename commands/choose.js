exports.run = (client, message, args) => {
    const leng = args.length;
    const rnd = Math.floor(Math.random() * (leng - 0));
    const wuw = rnd;
    const reply = args[wuw];
    message.channel.send('**I choose:** ' + reply + '!').catch(console.error);
}