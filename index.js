const music = require("./music.js")
const ms = require('ms')
const Database = require("better-sqlite3")
const db = Database()
const { rules } = require("./functions.js")
const config = require("./config.json")
const fs = require('fs')
const Discord = require('discord.js')
const express = require('express')
const app = express()
const client = new Discord.Client()

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.events.set(event.name, event);
}

app.listen(8080)
app.get("*", (req, res) => {
	console.log("I got pinged!")
	res.end("Online")
})

client.on("ready", () => {
	setInterval(() => {
		client.channels.cache.get("788819861971271680").setName(`Bots: ${client.guilds.cache.get("625046360936153101").members.cache.filter(member => member.user.bot).size}`)
		client.channels.cache.get("788819829246787585").setName(`Members: ${client.guilds.cache.get("625046360936153101").members.cache.filter(member => !member.user.bot).size}`)
		client.channels.cache.get("788819913258565643").setName(`Total Members: ${client.guilds.cache.get("625046360936153101").memberCount}`)
	}, ms("10m"))
	client.events.get("memberJoin").execute(client, Discord)
	client.events.get("memberBan").execute(client, Discord)
	client.user.setPresence({
		activity: {
			type: "WATCHING",
			name: "Scxr"
		},
		status: "idle"
	})
	console.log("Logged in")
})

client.on("message", (message) => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const args = message.content.slice(config.prefix.length).trim().split(/ +/)
	const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases == args[0].toLowerCase())
	if (!command) return
	command.execute(message, args, client, Discord)
})

client.login(process.env.TOKEN)
console.log("Logging in..")