const { MessageAttachment } = require('discord.js')
const { registerFont } = require('canvas');
const { join } = require('path')
const { createCanvas, loadImage } = require("canvas");

module.exports = {
	name: 'memberJoin',
	execute(client, Discord) {
		client.on('guildMemberAdd', member => {
			(async function() {
				registerFont('./Arial.ttf', { family: 'Arial' });
				const canvas = new createCanvas(350, 150)
				const ctx = canvas.getContext("2d")
				const background = await loadImage('./Welcome base image.png')
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
				ctx.font = "14px Arial";
				ctx.textAlign = "center";
				ctx.fillText(`${member.user.username}#${member.user.discriminator}`, 350 / 2, 33)
				var R = 50;
				ctx.arc(175, 90, R, 0, 2 * Math.PI, false);
				ctx.clip()
				const avatar = await loadImage(member.user.displayAvatarURL({ format: "png" }))
				ctx.drawImage(avatar, 125, 40, 100, 100)
				const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png")
				client.channels.cache.get('629838934662447104').send(attachment)
			})()
		})
		client.on('guildMemberRemove', member => {
			client.channels.cache.get('629838934662447104').send(`${member.user.username}**#${member.user.discriminator}** has just left the server. 😢`)
		})
	}
}