exports.run = (client, message, args) => {
  if(message.guild.id != process.env.HOMESERVER)return;
  const config = require('../config.json');
    if (message.author.id === config.ownerID) {
       const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./.data/profiles.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database');
        });
        let glds = client.guilds;
        db.serialize(() => {
            db.all(`SELECT DISTINCT hosting hoststate FROM users`, [], (err, rows) => {
                rows.forEach((row) => {
                    if(err){console.error(err);}
                    else if(row.hoststate === `0`)
                    {
                      return;
                    }
                  else{db.all(`UPDATE users SET hosting = '0'`,[], (err) =>
                    {if(err){console.error(err);}
                    else{
                        glds.tap(unHost => {
                                if(unHost.channels.some(chan => chan.name === "host-list"))
                                {
                                    let voof = unHost.channels.find(channl => channl.name === "host-list");
                                  
                                    voof.fetchMessages()
                                        .then (messages => {
                                          for (const[key, value] of messages.entries())
                                            {
                                              let emb = value.embeds;
                                              if(emb[0].title.includes("is hosting a lobby for"))
                                                {
                                                  console.log("IT EXISTS");
                                                  voof.fetchMessage(key)
                                                      .then(messag => messag.delete())
                                                      .catch(console.error);
                                                }
                                            }
                                        })
                                        .catch(console.error)
                                }
                          
                            }
                        );
                        message.channel.send("**P U R G ED**").then(msg => {
                            msg.delete(60000)
                        }).catch(console.error);
                    }
                    })
                    
                              }
            });
        });
    });
}}
