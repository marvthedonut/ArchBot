const { MessageEmbed } = require('discord.js')
module.exports = {
	name: "memberBan",
	execute(client, Discord) {
		client.on('guildBanAdd', async (guild, user) => {
			const banEmbed = new MessageEmbed()
				.setAuthor(user.tag, user.displayAvatarURL({ format: "png" }))
				.setColor(0x00f3ff)
				.setTitle("New banned user")
				.setTimestamp()
				.setFooter(client.tag, client.user.displayAvatarURL())
			const logs = await guild.fetchAuditLogs()
			var logEntry = logs.entries.first()
			banEmbed.addField("__Banned User__", user.tag, true)
				.addField("__Moderator__", logEntry.executor.username + "#" + logEntry.executor.discriminator, true)
				.addField("\u200b", "\u200b", true)
				.addField("__Banned User ID__", user.id, true)
				.addField("__Moderator ID__", logEntry.executor.id, true)
			client.channels.cache.get("788849240696422400").send(banEmbed)
		})
	}
}