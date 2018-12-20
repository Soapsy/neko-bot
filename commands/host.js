exports.run = (client, message, args) => {
require('dotenv').config();

if (message.author.bot)return;

if (message.guild.channels.some(chan => chan.name === "host-list")) {
    const hostchannel = message.guild.channels.find(channl => channl.name === "host-list");
    const request = require('request');
    const steamToken = process.env.STEAMAPI;
    let rawr;
    const sqlite3 = require('sqlite3').verbose();

    //открываем бд
    let db = new sqlite3.Database('../bot2/data/profiles.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database');
    });

    //типо синхронность

    var boober;
    db.serialize(() => {

        // ебашим таблицу если её нет
        db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, hosting TEXT, steam TEXT)');

		var hostcheck = 0;


        db.all(`SELECT DISTINCT hosting hoststate FROM users WHERE id = ?`, [message.author.id], (err, rows) => {
            rows.forEach((row) => {
                if(err){console.error(err);}
                if(row.hoststate == '1') {
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
            });
            //const regex = /\s*\d*\s*/g;
            //если аргумент указан, перезаписываем стимайди
            if(hostcheck === 0) {
                if (args[0] !=null) {

                    let setUser = `INSERT OR REPLACE INTO users (id, user, guild, hosting, steam) VALUES (?, ?, ?, ?, ?)`;

                    //обновляем строку юзера или создаем новую, если её нет
                    db.run(setUser, [message.author.id, message.member.displayName, message.guild.name, `0`, args[0]], (err) => {
                        if (err) {
                            console.error(err.message);
                            db.close((err) => {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log('SQL closed when trying to set user.');
                            });
                        }
                        console.log("args are here, user set");
                    });
                }
                    let sql = `SELECT DISTINCT id usercode, user userName, hosting hoststat, steam steamid FROM users WHERE id = ?`;
                    //получаем стимайди юзера
                    db.all(sql, [message.author.id], (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        rows.forEach((row) => {
                            if (row.steamid === null) {
                                message.channel.message.send("Please specify steam ID").then(msg => {
                                    msg.delete(10000)
                                }).catch(console.error);
                                //закрываем дб если не найден айди
                                db.close((err) => {
                                    if (err) {
                                        return console.error(err.message);
                                    }
                                    console.log('Database closed.');
                                });
                            } else {
                                console.log(row.steamid);
                                boober = steamsetup(row.steamid, row.userName, row.usercode);
                                /* db.close((err) => {
                                     if (err) {
                                         return console.error(err.message);
                                     }
                                     console.log('Database closed.');
                                 });*/
                            }
                        });
                    });

            }

        });



        function steamsetup(aaa, bbb, ccc) {
            console.log("Boob Returned: " + aaa);
            var reqPath = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' +
                steamToken + '&format=json&steamids=' + aaa;
            console.log(reqPath);

            var userID, game, gameID, lobby, nickname, link;
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
                if (body.response.players.length === 0) {
                    console.log("wrong");
                    message.channel.send("Incorrect user ID").then(msg => {
                        msg.delete(10000)
                    }).catch(console.error);
                    return;
                }
                userID = body.response.players[0].steamid;
                game = body.response.players[0].gameextrainfo;
                gameID = body.response.players[0].gameid;
                lobby = body.response.players[0].lobbysteamid;
                nickname = bbb;
                const usrMsg = args.join(" ");
                if (!(game) || !(gameID) || !(lobby)) {
                    message.channel.send("Lobby is not available").then(msg => {
                        msg.delete(10000)
                    }).catch(console.error);
                    return;
                }
                link = `<@${ccc}> made a lobby for **${game}**! \nTo join please follow:  steam://joinlobby/${gameID}/${lobby}/${userID} `;
                console.log(link);
                db.all(`UPDATE users SET hosting = '1' WHERE id = ?`, [message.author.id], (err) => {
                    if (err) console.error(err);
                    console.log("set host");
                });
                hostchannel.send(link).catch(console.error);
                console.log('lobby link:  steam://joinlobby/' + body.response.players[0].gameid + '/' + body.response.players[0].lobbysteamid + '/' + body.response.players[0].steamid + ' Game: ' + body.response.players[0].gameextrainfo)

            });
        }
    });
}else {
		message.channel.send("No host-list set. Please use !setchannels or create it manually.").then(msg => {
            msg.delete(10000)
        }).catch(console.error);
	}
}