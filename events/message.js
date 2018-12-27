exports.run = (client, message) => {
 const config = require('../config.json');
const prefix = config.prefix;
const chan = message.channel;

  //реакшены
    if (!message.author.bot) {
        const o = require('../data/reacts.json');
        console.log(o['a\*']);
        const reactions = Object.keys(o).map(regexp => ({regexp: new RegExp(regexp), text: o[regexp]}));
        console.log(reactions[0]);
        const message_text = message.content;
        console.log(message_text);
        const rnd = Math.round(Math.floor(Math.random() * (11- 1)) + 1);
        if ((rnd === 10) || (rnd === 4) || (rnd === 6) || (rnd === 2)) {
            if ((message.content.toLowerCase().includes("баклажан")) || (message.content.toLowerCase().includes("eggplant"))) {
                if (message.author.bot) return; //	реакты для ботов выключены
                message.react("🍆").catch(console.error);
            }
            reactions.forEach(({regexp, text}) => regexp.test(message_text) ? message.channel.send(text).catch(console.error) : console.log("no"));
        }

  //Присваивание счетчика ролей
        if (chan.type === "text" && chan.name.toLowerCase() === "role-management") {
            const roleObj = message.guild.roles.find(r => message.content.includes(r.name));
            if (roleObj) {
                message.react("✅");
                console.log("Role created");
            } else {
                message.channel.send("There is no such role").then(msg => {
                    msg.delete(10000)
                }).catch(console.error);
            }
        }
        if (message.content.indexOf(prefix) !== 0) return;	//	проверка на префикс


        // Разбиваем аргументы команды
        const args1 = message.content.slice(prefix.length).trim();
        let args, command;

        if (args1.includes("choose")) {
            let trimvar = args1.indexOf(" ");
            let command1 = args1.slice(0, trimvar);
            command = command1.toLowerCase();
            var newargs1 = args1.slice(trimvar+1);
            console.log(newargs1 +" newargs1 is");
            console.log(command + " command");
            let args3 = newargs1.split(/,/g);
            console.log("args3 is " + args3);
            args = args3;
                console.log("args is " + args);
        } else {
            args = args1.split(/ +/g);
            command = args.shift().toLowerCase();
        }

        // Цепляем нужную команду
        try {
            let commandFile = require(`../commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
            console.error(err);
        }
    }
}