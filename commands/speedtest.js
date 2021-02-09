module.exports = {
  name: 'speedtest',
  shortcut: ['test', 'st'],
  description: 'Check the bot\'s internet upload & download speed through speedtest.net',
  usage: '!speedtest',
  async execute (Discord, message, args, client) {
    const speedtest = require('speedtest-net');

    message.channel.startTyping();
    const result = await speedtest({ acceptLicense: true, acceptGdpr: true });
    const downloadValue = result.download.bandwidth / 125000;
    const uploadValue = result.upload.bandwidth / 125000;
    const testEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('**Internet Speed Test**')
      .setDescription('This is the bot\'s internet speed:')
      .addFields(
        { name: 'Ping', value: `${Math.round(result.ping.latency)} ms`, inline: true },
        { name: 'Download', value: `${Math.round(downloadValue)} Mbps`, inline: true },
        { name: 'Upload', value: `${Math.round(uploadValue)} Mbps`, inline: true }
      );
    message.channel.send(testEmbed);
    message.channel.stopTyping();
  }
};
