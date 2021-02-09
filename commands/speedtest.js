module.exports = {
  name: 'speedtest',
  shortcut: ['test', 'st'],
  description: 'Check your internet upload & download speed through speedtest.net',
  usage: '!speedtest',
  async execute (Discord, message, args, client) {
    const speedtest = require('speedtest-net');
    const { member } = message;

    message.channel.startTyping();
    const result = await speedtest();
    const downloadValue = result.download.bandwidth / 125000;
    const uploadValue = result.upload.bandwidth / 125000;
    const testEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('**Internet Speed Test**')
      .setDescription(`Here is <@${member.id}>'s Internet Speed Test`)
      .addFields(
        { name: 'Ping', value: `${Math.round(result.ping.latency)} ms`, inline: true },
        { name: 'Download', value: `${Math.round(downloadValue)} Mbps`, inline: true },
        { name: 'Upload', value: `${Math.round(uploadValue)} Mbps`, inline: true }
      );
    message.channel.send(testEmbed);
    message.channel.stopTyping();
  }
};
