const Discord = require("discord.js")
const client = new Discord.Client()
client.login('process.env.token')
//Comando #say
client.on('message', async message =>  {
        if(message.content.startsWith('#say')) {
            var messageArray = message.content.split(" ")
                var messageargs = messageArray.slice(1)
                var say = messageargs.join(" ")
        
                let InvalidSay = new Discord.MessageEmbed()
                .setTitle("Comando Incompleto")
                .setDescription(message.author.toString() + " Devi digitare un messaggio valido!")
                if(!say) return message.channel.send(InvalidSay)
                message.channel.send(say)
                message.delete({timeout: 0000})
        }


    //Comando #clear
        if (message.content.startsWith("#clear")) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) { //Controllare che l'utente abbia il permesso di cancellare messaggi
                message.channel.send('Non hai il permesso');
                return;
            }
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { //Controllare che il bot abbia il permesso di cancellare messaggi
                message.channel.send('Non ho i permessi!');
                return;
            }
    
            var count = message.content.slice(7); //Ottenere il numero inserito dall'utente
            count = parseInt(count);
    
            if (!count) {
                message.channel.send("Inserisci Un Numero Valido")
                return
            }
    
            message.channel.bulkDelete(count, true)
            message.channel.send(count + " I Messaggi Contati Sono Stati Eliminati").then(msg => {
                msg.delete({ timeout: 1000 })
                        })
            }

        //Comando #ban
            if (message.content.startsWith("#ban")) {
                var utenteKick = message.mentions.members.first();
        
                if (!message.member.hasPermission('BAN_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
                    message.channel.send('Non hai il permesso');
                    return;
                }
        
                if (!utenteKick) {
                    message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
                    return;
                }
        
                if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
                    message.channel.send('Io non ho il permesso');
                    return
                }
        
                utenteKick.ban()
                    .then(() => message.channel.send("<@" + utenteKick + ">" + " bannato"))
            }
                    //Comando #kick
                        if (message.content.startsWith("#kick")) {
                            var utenteKick = message.mentions.members.first();
                    
                            if (!message.member.hasPermission('KICK_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
                                message.channel.send('Non hai il permesso');
                                return;
                            }
                    
                            if (!utenteKick) {
                                message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
                                return;
                            }
                    
                            if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
                                message.channel.send('Io non ho il permesso');
                                return
                            }
                    
                            utenteKick.kick()
                                .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))
                        }
                    //Comando #userinfo

                        if (message.content.startsWith("#userinfo")) {
const utente = message.mentions.members.first() || message.member

                    
                            var elencoPermessi = "";
                            if (utente.hasPermission("ADMINISTRATOR")) {
                                elencoPermessi = ":crown: AMMINISTRATORE";
                            }
                            else {
                                var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]
                    
                                for (var i = 0; i < permessi.length; i++) {
                                    if (utente.hasPermission(permessi[i])) {
                                        elencoPermessi += "- " + permessi[i] + "\r";
                                    }
                                }
                            }
                    
                            var embed = new Discord.MessageEmbed()
                                .setTitle(utente.user.tag)
                                .setDescription("Tutte le info di questo utente")
                                .setThumbnail(utente.user.avatarURL())
                                .addField("User id", utente.user.id, true)
                                .addField("Stato", utente.user.presence.status, true)
                                .addField("Account creato il ", utente.user.createdAt.toDateString(), true)
                                .addField("È un bot?", utente.user.bot ? "Si" : "No`", true)
                                .addField("Entrato in questo server", utente.joinedAt.toDateString(), true)
                                .addField("Permessi", elencoPermessi, false)
                                .addField("Ruoli", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
                    
                            message.channel.send(embed)
                            }
                            //Comando !aiuto
                            if(message.content == "!aiuto") {
                                message.channel.send("Per ora i comandi sono: c!clear (solo staff); c!say (per tutti); c!kick (per staff) e c!ban (per staff)")
                        //Stato personalizzato
                        bot.user.SetActivity('EDT eSports (!aiuto per comandi)', { type: "WATCHING" }).catch(console.error)
                            }

                    })
 //Tickets Sistem
client.on("message", message => {
    if (message.content == "#ConfigTicketSistem") {
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩"))

    }
}) 


client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction._emoji.name == "📩") { //Emoji reazione
        if (messageReaction.message.channel.id == "850371803385299024") { //ID Canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }

            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("850375874632482846") //ID Categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("Grazie per aver aperto un ticket")
            })
        }
    }
})

client.on("message", message => {
    if (message.content == "!chiudi") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }

    if (message.content.startsWith("!aggiungi")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!rimuovi")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }

                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
 
        }
    }
})