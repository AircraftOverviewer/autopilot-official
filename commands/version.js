module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch notes about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.2.1')
      .setDescription('```\n+ Added \'insult\' command. Allows users to have the bot insult another user. See \'!help insult\' for more information```');
    message.channel.send(versionEmbed);
  }
};
