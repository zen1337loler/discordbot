const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Justice say u cant use this Command!")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Please enter the nickname!")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I didn't have Justice Power!")

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
    message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))
    
    message.channel.send(`**${banMember.user.tag}** has been banned`)

    let inline = true;
    let baembed = new Discord.RichEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL)
    .addField("Moderation: Ban")
    .addField("Ban:", banMember.user.username, inline)
    .addField("Moderator:", message.author.username, inline)
    .addField("Reason:", reason, inline)
    .addField("Date:", message.createdAt.toLocaleString(), inline)
    .setTimestamp();

let bChannel = message.guild.channels.find(c => c.name === "logs")
    bChannel.send(baembed)

};

module.exports.config = {
    name: "ban",
    description: "Ban a user from the Server!",
    usage: ",ban",
    accessableby: "Administrators",
    aliases: ["b", "banish"]
}