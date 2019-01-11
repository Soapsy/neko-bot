exports.run = (client, message, args) => {
require('dotenv').config();

if (message.author.bot)return;

  
if (message.guild.channels.some(chan => chan.name === "host-list")) {

    //зависимости
    require('dotenv').config();
    const request = require('request');
    const sqlite3 = require('sqlite3').verbose();
    const Discord = require('discord.js');

    const hostchannel = message.guild.channels.find(channl => channl.name === "host-list");
    const steamToken = process.env.STEAMAPI;
    var boober;

    let glds = client.guilds;
    //открываем бд
    let db = new sqlite3.Database('./.data/profiles.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database');
    });


    //бд сиквенс
    db.serialize(() => {

        // ебашим таблицу если её нет
        db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, hosting TEXT, steam TEXT)');

        let existsUs;
        db.get(`SELECT * FROM users WHERE id = ?`,[message.author.id], (err, res) => {
            console.log(`Completed row is ${res}`);
            if (err) {
                console.error(err.message);
            }
            if(res==0 || res==null){
                existsUs = 0;
                console.log("Id not found");
                message.channel.send("You dont have steam ID set. Please use \n``!register [steamurl]``").catch(console.error);
                //закрываем дб если не найден айди
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Database closed.');
                });
            }
            else if (res) {
                console.log("Id found");
                //проверка на активный хост
                var hostcheck = 0;
                db.get(`SELECT DISTINCT hosting hoststate FROM users WHERE id = ?`, [message.author.id], (err, rows) => {
                    if (err) {
                        console.error(err);
                    }
                    if (rows.hoststate == '1') {
                        hostcheck = 1;
                        message.channel.send("You're already hosting.").then(msg => {
                            msg.delete(10000)
                        }).catch(console.error);
                        db.close((err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log('Database closed.');
                        });
                    }

                    //const regex = /\s*\d*\s*/g; -- я забыл че это

                    if (hostcheck === 0) {

                        let sql = `SELECT DISTINCT id usercode, user userName, steam steamid, guild home FROM users WHERE id = ?`;
                        //получаем стимайди юзера
                        db.get(sql, [message.author.id], (err, rows) => {
                            if (err) {
                                throw err;
                            }
                                console.log(rows.steamid);
                                boober = steamsetup(rows.steamid, rows.userName, rows.usercode, rows.home);
                                /* db.close((err) => {
                                     if (err) {
                                         return console.error(err.message);
                                     }
                                     console.log('Database closed.');
                                 });*/
                        });

                    }

                });
            }
        });
        var timerId;
        var reqPath;

        function steamsetup(aaa, bbb, ccc, ddd) {
            console.log("Boob Returned: " + aaa);
            reqPath = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' +
                steamToken + '&format=json&steamids=' + aaa;
            console.log(reqPath);

            var userID, game, gameID, lobby, nickname, link;
            request(reqPath, {json: true}, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                if (response.statusCode !== 200) {
                    message.channel.send("Connection failed").then(msg => {
                        msg.delete(60000)
                    }).catch(console.error);
                    return;
                }
                if (body.response.players.length === 0) {
                    console.log("wrong");
                    message.channel.send("Incorrect user ID").then(msg => {
                        msg.delete(60000)
                    }).catch(console.error);
                    return;
                }
                userID = body.response.players[0].steamid;
                game = body.response.players[0].gameextrainfo;
                gameID = body.response.players[0].gameid;
                lobby = body.response.players[0].lobbysteamid;
                nickname = message.author.username;
                const usrMsg = args.join(" ");
                if (!(game) || !(gameID) || !(lobby)) {
                    message.channel.send("Lobby is not available. Make sure your steam Games tab is public or add\n ``https://steamcommunity.com/id/sosoap``\nto your friends").then(msg => {
                        msg.delete(60000)
                    }).catch(console.error);
                    return;
                }
                let notes = args.join(" ");
              const randclr = Math.floor(Math.random() * 16777214) + 1;
              const linkpath = `steam://joinlobby/${gameID}/${lobby}/${userID}`
              link = new Discord.RichEmbed()
                .setTitle(`Is hosting a lobby for ${game}`)
                .setColor(randclr)
                //.setThumbnail(message.member.user.avatarURL)
                .setDescription(`\nClick [here](${linkpath}) to join!`)
                .setAuthor(nickname, message.member.user.avatarURL)
                .setFooter(message.guild.name, message.guild.iconURL);
                //link = `**${nickname}** made a lobby for **${game}**! \nTo join please follow:  steam://joinlobby/${gameID}/${lobby}/${userID} \n *sent from ${message.guild.name}*\n${notes}`;
                console.log(link);
                db.all(`UPDATE users SET hosting = '1' WHERE id = ?`, [message.author.id], (err) => {
                    if (err) console.error(err);
                    console.log("set host");
                });
                glds.tap(setHost => {
                    if(setHost.channels.some(chan => chan.name === "host-list"))
                    {
                        let voof = setHost.channels.find(channl => channl.name === "host-list");
                        voof.send(link).catch(console.error);
                    }
                }
                );
                message.channel.send("Host created.").then(msg => {
                            msg.delete(60000)
                        }).catch(console.error);
                console.log('lobby link:  steam://joinlobby/' + body.response.players[0].gameid + '/' + body.response.players[0].lobbysteamid + '/' + body.response.players[0].steamid + ' Game: ' + body.response.players[0].gameextrainfo)

            });
        }

        /*function checker(){
            request(reqPath, {json: true}, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                if (response.statusCode !== 200) {
                    message.channel.send("Connection failed").then(msg => {
                        msg.delete(10000)
                    }).catch(console.error);
                    return;
                }
              console.log("Check happened");
                let lobbe = body.response.players[0].lobbysteamid;
                if(!lobbe){
                  console.log("Lobby unfound, unhosting");
                    unhoster(timerId);
                }
        });
        }

        function unhoster(tmr){
            db.serialize(() => {
              console.log("Unhosting");
                db.get(`SELECT DISTINCT hosting hoststate FROM users WHERE id = ?`, [message.author.id], (err, rows) => {
                    if (err) {
                        console.error(err);
                    } else if (rows.hoststate === `0`) {
                        db.close((err) => {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log('Database closed.');
                        });
                        clearTimeout(tmr);
                        return;
                    }
                    db.all(`UPDATE users SET hosting = '0' WHERE id =?`, [message.author.id], (err) => {

                        if (err) {
                            console.error(err);
                        } else {
                            let usid = message.author.id;
                            const hostchannel = message.guild.channels.find(channl => channl.name === "host-list");
                            hostchannel.fetchMessages()
                                .then(messages => (messages.find(val => val.content.includes(`<@${usid}> made a lobby for`))).delete().catch(err)
                                    .catch(console.error));
                            hostchannel.send(`**${message.author.username}** has stopped hosting.`).then(msg => {
                                msg.delete(300000)
                            }).catch(console.error);
                            clearTimeout(tmr);
                            db.close((err) => {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log('Database closed.');
                            });
                        }
                    });
                });
            });
        }*/

    }); 
}else {
		message.channel.send("No host-list set. Please use !setchannels or create it manually.").then(msg => {
            msg.delete(60000)
        }).catch(console.error);
	}
}