exports.run = (client, message, args) => {
	var text = args.join(" ");
    message.channel.send(text).then(message.delete()).catch(console.error);
}