exports.run = (client, message, args) => {
    if (message.author.bot)return;
    if (message.guild.channels.some(chan => chan.name === "host-list")) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('../bot2/data/profiles.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database');
        });
        db.serialize(() => {
            db.all(`SELECT DISTINCT hosting hoststate FROM users WHERE id = ?`, [message.author.id], (err, rows) => {
                rows.forEach((row) => {
                    if(err){console.error(err);}
                    else if(row.hoststate === `0`)
                    {message.channel.send("No host found.").then(msg => {
                        msg.delete(10000)
                    }).catch(console.error);
                        db.close((err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log('Database closed.');
                        });
                    }
                    else{db.all(`UPDATE users SET hosting = '0' WHERE id =?`,[message.author.id], (err) =>
                    {if(err){console.error(err);}
                    else{
                        let usid = message.author.id;
                        const hostchannel = message.guild.channels.find(channl => channl.name === "host-list");
                        hostchannel.fetchMessages()
                            .then(messages => (messages.find(val => val.content.includes(`<@${usid}> made a lobby for`))).delete()
                                .catch(console.error));
                        message.channel.send("Unhosted.").then(msg => {
                            msg.delete(10000)
                        }).catch(console.error);
                        db.close((err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log('Database closed.');
                        });
                    }
                    })
                    }
                    })
            });
        });
    }
}