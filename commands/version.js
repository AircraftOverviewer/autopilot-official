module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch notes about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.3.2')
      .setDescription('```\n+ Added \'suvat\' command. Can be used to solve any unknowns from a set of known SUVATs. Try \'!help suvat\' for more information\n+ Added \'force\' command. Can be used to solve simple force equations using Newton\'s Second Law of Motion. Try \'!help force\' for more information\n+ Added \'ohms\' command. Can be used to solve Voltage, Current & Resistance in an electrical system\n+ Bug fixes```');
    message.channel.send(versionEmbed);
  }
};
