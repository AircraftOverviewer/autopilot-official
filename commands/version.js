module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch nots about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.2.0')
      .setDescription('```\n+ Added \'!clip\' command. Use \'!help clip\' for more information\n+ General bug fixes ```');
    message.channel.send(versionEmbed);
  }
};
