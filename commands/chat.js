module.exports = {
  name: 'chat',
  shortcut: ['talk', 'speak', 'c'],
  description: 'Talk to a basic and funny chat AI, and have it respond to you',
  usage: 'ap chat [message]',
  parameters: {
    1: { name: '[message]', description: '- The message that you want the bot to reply to' }
  },
  async execute (Discord, message, args) {
    const Cleverbot = require('cleverbot-free');
    if (!args[0]) {
      const noQuestionEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include something to say');

      return message.channel.send(noQuestionEmbed);
    }

    const input = args.join(' ');

    message.channel.startTyping();

    const response = await Cleverbot(input);

    message.channel.stopTyping();
    message.channel.send(response);
    setTimeout(() => {
      message.channel.stopTyping();
    }, 10000);
  }
};
