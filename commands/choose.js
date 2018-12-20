exports.run = (client, message, args) => {
    const leng = args.length;
    const rnd = Math.floor(Math.random() * (leng - 0));
    const wuw = rnd;
    console.log(wuw);
    const reply = args[wuw];
    console.log("reply is " + reply);
    message.channel.send('**I choose:** ' + reply + '!').catch(console.error);
}