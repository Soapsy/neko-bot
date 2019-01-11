exports.run = (client, message, args) => {
    if (message.author.bot)return;
     if (message.guild.channels.some(chan => chan.name === "host-list")) {
        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./.data/profiles.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database');
        });
        let glds = client.guilds;
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
                        let usid = message.author.username;
                        glds.tap(unHost => {
                          let nya;
                                if(unHost.channels.some(chan => chan.name === "host-list"))
                                {
                                    let voof = unHost.channels.find(channl => channl.name === "host-list");
                                  
                                    voof.fetchMessages()
                                        .then(messages => {
                                      for(const[key, value] of messages.entries())
                                        {
                                               let emb = value.embeds;
                                          console.log(emb);
                                                if(emb.author.name==message.author.username)
                                                {
                                                  value.delete().catch(console.error);
                                                }
                                              
                                        }
                                    })
                                          .catch(console.error)
                                }
                         /* if(nya)
                          {nya.delete().catch(console.error);
                          console.log("yes nya");}
                          else{console.log("No nya");}*/
                          
                            }
                        );
                        message.channel.send("Unhosted.").then(msg => {
                            msg.delete(60000)
                        }).catch(console.error);
                    }
                    })
                    }
                    })
            });
        });
    }
}