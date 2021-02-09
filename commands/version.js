module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch nots about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.2.0')
      .setDescription('```\n+ Added \'speedtest\' command. Use to check the bot\'s ping, downoad and upload speeds. Use \'!help speedtest\' for more information\n+ Minor bug fixes```');
    message.channel.send(versionEmbed);
  }
};
