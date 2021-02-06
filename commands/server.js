module.exports = {
  name: 'server',
  description: 'Check the name and number of members in a given server',
  usage: '!server',
  execute (Discord, message, args, client) {
    const serverEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`**Server name:** ${message.guild.name}\n**Total members:** ${message.guild.memberCount}`);
    message.channel.send(serverEmbed);
  }
};
