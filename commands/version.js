module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch notes about the latest release of the bot',
  usage: 'ap version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.4.0')
      .setDescription('```+ Added all Physics commands back to the bot\n+ Fixed prefix errors involving \'!\'\n+ Bug fixes\n**Please feel free to DM any issues to 3301#4977**```');
    message.channel.send(versionEmbed);
  }
};
