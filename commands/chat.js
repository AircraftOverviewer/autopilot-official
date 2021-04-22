module.exports = {
  name: 'chat',
  shortcut: ['talk', 'speak', 'c'],
  description: 'Talk to a basic and funny chat AI, and have it respond to you',
  usage: 'ap chat [message]',
  parameters: {
    1: { name: '[message]', description: '- The message that you want the bot to reply to' }
  },
  execute (Discord, message, args, client) {
    const Cleverbot = require('cleverbot-free');
    const question = args.join(' ');
    const noQuestionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You must include something to say');
    if (!args[0]) {
      message.channel.send(noQuestionEmbed);
    } else {
      message.channel.startTyping();
      Cleverbot(question).then(response => {
        message.channel.stopTyping();
        message.channel.send(response);
      });
    }
  }
};
