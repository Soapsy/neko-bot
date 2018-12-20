exports.run = (client, message, args) => {
	var text = args.join(" ");
    message.channel.send(text).catch(console.error);
}