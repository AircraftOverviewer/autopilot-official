module.exports = {
  name: 'repo',
  shortcut: ['repository'],
  description: 'Get the link for the GitHub Repo of the bot',
  usage: 'ap repo',
  execute (Discord, message, args, client) {
    const repo = 'https://github.com/AircraftOverviewer/autopilot-official';
    const repoEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`To see this bot's source code, click on [this link](${repo}) to be taken to the bot's GitHub Repository`);
    message.channel.send(repoEmbed);
  }
};
