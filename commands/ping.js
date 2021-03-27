module.exports = {
  name: 'ping',
  description: 'Standard ping command',
  usage: 'ap ping',
  execute (Discord, message, args, client) {
    message.channel.send('*Pinging...*').then(pingMsg => {
      pingMsg.edit('`Pong!` ' + `${pingMsg.createdTimestamp - message.createdTimestamp} ms`);
    });
  }
};
