module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch notes about the latest release of the bot',
  usage: 'ap version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.4.0')
      .setDescription('```- Added a catch to \'chat\' to ensure that if Cleverbot API does not respond within 10 seconds the command returns\n- Updated cleverbot-free');
    message.channel.send(versionEmbed);
  }
};
