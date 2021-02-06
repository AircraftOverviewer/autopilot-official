module.exports = {
  name: 'invite',
  description: 'Sends the URL to invite this bot to any of your servers (must be admin for full capabilitis)',
  usage: '!invite',
  execute (Discord, message, args, client) {
    const invite = 'https://discord.com/api/oauth2/authorize?client_id=747720482668675112&permissions=8&scope=bot';
    const inviteEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`To invite the bot to your own server, click on [this link](${invite}) to be taken to Discord's bot verification page`);
    message.channel.send(inviteEmbed);
  }
};
