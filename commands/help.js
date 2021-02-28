const config = require('../config.json')
module.exports = {
	name: "help",
	description: "Get all commands or a specific command.",
	example: "[command name]",
	aliases: ['commands'],
	execute(message, args, client, Discord) {
		const cmdEmbed = new Discord.MessageEmbed()
			.setTitle("Commands")
			.setColor(message.member.displayColor)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setThumbnail(message.guild.iconURL())
		client.commands.forEach(item => {
			cmdEmbed.addField(config.prefix + item.name, item.description, true)
		})
		message.channel.send(cmdEmbed)
	}
}