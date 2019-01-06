exports.run = (client, message, args) => {
    if (message.author.bot) return;

    //зависимости
    require('dotenv').config();
    var request = require('request');
    const sqlite3 = require('sqlite3').verbose();
    const steamToken = process.env.STEAMAPI;

    let db = new sqlite3.Database('./.data/profiles.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database');
    });

    var reg1 = /https:\/\/steamcommunity\.com\/id\/(.+)$/;
    var reg2 = /https:\/\/steamcommunity\.com\/profiles\/(\d+)$/;
    var inputid;
    if ((args[0] != null) && (reg2.test(args[0]))) {

        inputid = args[0].slice(36).trim();
        console.log(`Everything is fine. Continuing to registration function`);
        registration(inputid);
    }
    else if((args[0] != null) && (reg1.test(args[0]))) {
            //конверсия айди
            inputid = args[0].slice(30).trim();
            request(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamToken}&vanityurl=${inputid}`,
                {json: true}, function (error, response, body) {
                    console.log('error:', error);
                    if (response.statusCode !== 200) {
                        message.channel.send("Connection failed").then(msg => {
                            msg.delete(10000)
                        }).catch(console.error);
                        return;
                    }
                    if (body.response.length === 0) {
                        console.log("wrong");
                        message.channel.send("Profile not found").then(msg => {
                            msg.delete(10000)
                        }).catch(console.error);
                        return;
                    }
                    console.log("Converted " + body.response.steamid);
                    registration(body.response.steamid);
                });



        }
    else{message.channel.send(`Please provide a correct steam profile link`);}


    function registration(userID) {
            //работа с бд
            db.serialize(() => {

                // ебашим таблицу если её нет
                db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, user TEXT, guild TEXT, hosting TEXT, steam TEXT)');
                let setUser = `INSERT OR REPLACE INTO users (id, user, guild, hosting, steam) VALUES (?, ?, ?, ?, ?)`;
                db.run(setUser, [message.author.id, message.member.displayName, message.guild.name, `0`, userID ], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    message.channel.send("You can host now.")
                });

            });
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('SQL closed when trying to set user.');
        });
    }

}
