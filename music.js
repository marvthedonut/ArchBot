const fs = require("fs")
const ytdl = require('ytdl-core')
const pathToFFmpeg = require('ffmpeg-static')
module.exports = async (client, channel, url, volume) => {
	const connection = await client.channels.cache.get(channel).join()
	var dispatcher = connection.play(ytdl(url, { filter: "audioonly" }), { volume: volume })
  return dispatcher
}