module.exports = {
  name: 'invite',
  description: 'Sends the URL to invite this bot to any of your servers (must be admin for full capabilitis)',
  usage: '!invite',
  execute (Discord, message, args, client) {
    message.channel.send('https://discord.com/api/oauth2/authorize?client_id=747720482668675112&permissions=8&scope=bot');
  }
};
