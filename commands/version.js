module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch notes about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.4.0')
      .setDescription('```- Removed all physics commands and added them to a dedicated physics bot called \'Quantanium\'\n+ Bug fixes```');
    message.channel.send(versionEmbed);
  }
};
