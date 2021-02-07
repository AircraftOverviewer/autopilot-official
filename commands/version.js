module.exports = {
  name: 'version',
  shortcut: ['update'],
  description: 'See the latest patch nots about the latest release of the bot',
  usage: '!version',
  execute (Discord, message, args, client) {
    const versionEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Current Version - v2.1.1')
      .setDescription('```\n+ Massive overhaul of the help command. Now is dynamic and individually changes depending on the command\n+ Complete recoding of the Autopilot bot. Bot should now run much smoother and have less bug issues\n+ Added "invite" command. Sends a bot invite URL (check "!help invite" for more)```');
    message.channel.send(versionEmbed);
  }
};
