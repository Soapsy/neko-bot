exports.run = (client, packet) => {
    // We don't want this to run on unrelated packets
		if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
		// Grab the channel to check the message from
		const channel = client.channels.get(packet.d.channel_id);
		// There's no need to emit if the message is cached, because the event will fire anyway for that
		if (channel.messages.has(packet.d.message_id)) return;
		// Since we have confirmed the message is not cached, let's fetch it 
		console.log("raw detected");
		const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;		
		channel.fetchMessage(packet.d.message_id).then(message => {
				
			if (packet.t === 'MESSAGE_REACTION_ADD') {
				const reaction = message.reactions.get(emoji);
				console.log("Raw2    :" + reaction);
				client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
				console.log("Emitted add");
			}
			if (packet.t === 'MESSAGE_REACTION_REMOVE') {
			console.log("Removing");
				const reaction = message.reactions.get(emoji);
				console.log(reaction);
				client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
				console.log("Emitted remove");
			}
		});
}