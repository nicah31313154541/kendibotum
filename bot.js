const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db')


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.lenght} komut yüklenecek.`)
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}`)
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`Aleyküm Selam hoşgeldin :poop:`)
});
client.on('ready', ()=>{
    client.channels.cache.get('855759622350045214').startTyping()
    })
    client.on("ready", () => {
        client.channels.cache.get("853350220619841550").join();
      })



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on("message", async message => {
    message.react(':poop')
    });
   
    client.on("messageDelete", async message => {
        let engin = db.fetch(`mesajlog_${message.guild.id}`)
        if(!engin) return;
        const embed2 = new Discord.MessageEmbed()
        .setTitle('Bir mesaj silindi!')
        .setDescription(`__**Kişi Bilgileri**__ \n Silen kişi: <@${message.author.id}> \n Silen kişinin idi: ${message.author.id} \n \n __**Kanal Bilgileri**__ \n Silinen Kanal: <#${message.channel.id}> \n Silinen Kanalın idi: ${message.channel.id} \n \n __**Mesaj Bilgileri**__ \n Silinen mesaj: ${message.content} \n Silinen Mesajın İdi: ${message.id}`)
        .setColor('RANDOM')
       client.channels.cache.get(engin).send(embed2)
      })
      
      //
      client.on("messageUpdate", async (oldMessage, newMessage) => {
        let engin = db.fetch(`mesajlog_${oldMessage.guild.id}`)
        if(!engin) return;
        if(oldMessage.author.bot) return;
        const embed = new Discord.MessageEmbed()
        .setTitle('Bir mesaj düzenlendi!')
        .setDescription(`__**Kişi Bilgileri**__ \n Düzenleyen kişi: <@${oldMessage.author.id}> \n Düzenleyen kişinin idi: ${oldMessage.author.id} \n \n __**Kanal Bilgileri**__ \n Düzenlenen Kanal: <#${oldMessage.channel.id}> \n Düzenlenen kanalın idi: ${oldMessage.channel.id} \n \n __**Mesaj Bilgileri**__ \n Düzenlenen mesaj: ${oldMessage.content} \n Düzenlenen mesajın yeni hali: ${newMessage.content} \n Düzenlenen mesajın idi: ${oldMessage.id} \n [Düzenlenen mesaja gitmek için tıkla](${oldMessage.url})`)
        .setColor('RANDOM')
        client.channels.cache.get(engin).send(embed)
        
      
      });
      client.on("message", msg => {
        var dm = client.channels.cache.get("855870827906990081")
        if(msg.channel.type === "dm") {
        if(msg.author.id === client.user.id) return;
        const botdm = new Discord.MessageEmbed()
        .setTitle(`🔔 Yeni Bir Mesajım Var`)
        .setTimestamp()
        .setColor("RED")
        .setThumbnail(`${msg.author.avatarURL()}`)
        .addField("Gönderen", msg.author.tag)
        .addField("Gönderen ID", msg.author.id)
        .addField("Gönderilen Mesaj", msg.content)
        
        dm.send(botdm)
        
        }
        if(msg.channel.bot) return;
        });
        client.on("ready", () => {
            client.channels.cache.get("841251477968126002").join();
          })
          
          
          client.on('guildMemberAdd', member => {
            if (member.user.bot) member.roles.add("855863489343127554")
          })
          client.on('guildCreate', guild => {
            let virus = guild.channels.filter(c => c.type === "text").random()
            virus.send("Selamlar! :poop:");
        });
        client.on('ready', ()=>{
            client.channels.cache.get('856162912960118788').startTyping()
            })
            client.on("ready", () => {
                client.channels.cache.get("856162912960118789").join();
              })
              Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android" 