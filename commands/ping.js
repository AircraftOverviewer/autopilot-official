module.exports = {
  name: 'ping',
  description: 'Standard ping command',
  usage: '!ping',
  execute (Discord, message, args, client) {
    message.channel.send('*Pinging...*').then(pingmessage => {
      pingmessage.edit('`Pong!` ' + `${pingmessage.createdTimestamp - message.createdTimestamp} ms`);
    });
  }
};
