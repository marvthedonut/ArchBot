module.exports = {
	name: "clear",
	description: "Purge messages.",
	aliases: ["purge"],
	example: "<messages>",
	async execute(message, args, client, Discord) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to do this!")
		if (isNaN(args[1])) return message.reply("Please provide a valid amount of messages to clear.");
		if(parseInt(args[1]) > 99) return message.reply("I can only delete 99 messages at a time!")
		if(parseInt(args[1]) < 1) return message.reply("I can only delete 1 message at least!")
		message.reply("Successfully deleted " + (await message.channel.bulkDelete(parseInt(args[1]) + 1, true)).size - 1 + " messages!").then(msg => setTimeout(() => msg.delete() ,3000))
	}
}