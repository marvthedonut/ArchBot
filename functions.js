const Discord = require('discord.js')
module.exports = {
	rules: (client) => {
		var rulesEm = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle("Rules")
			.setDescription(`1). No racism or anything offensive.

2). Don't beg for roles.

3). Don't advertise unless given permission.

4). Do not bring hate into this server.`)
			.setFooter("Permalink: https://discord.gg/R5ve42QP")
			.setTimestamp()
			.setThumbnail(client.guilds.cache.get("625046360936153101").iconURL())
		client.channels.fetch("629836110092173343").then(channel => channel.send(rulesEm))
	}
}