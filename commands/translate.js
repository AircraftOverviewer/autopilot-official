module.exports = {
  name: 'translate',
  shortcut: ['t', 'tl'],
  description: 'Translate anything from another language into English',
  usage: 'ap translate [message]',
  parameters: {
    1: { name: '[message]', description: '- (Optional) Write/paste in a message for the bot to translate. If left blank, the bot will grab the latest message in the channel and translate it' }
  },
  async execute (Discord, message, args, client) {
    const { microsoft } = require('translate-platforms');
    const ISO6391 = require('iso-639-1');
    (async () => {
      let input;
      if (args[0]) {
        input = args.join(' ');
      } else {
        try {
          const result = await message.channel.messages.fetch({ limit: 2 });
          input = result.array()[1].content;
        } catch {
          const errorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('<:error:784747315960479754> There was an error fetching that message');
          message.channel.send(errorEmbed);
        }
      }
      const result = await microsoft(input, { to: 'en' });
      if (result.lang.from === 'en') {
        const englishEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription('<:error:784747315960479754> This message is already in English');
        message.channel.send(englishEmbed);
        return;
      }
      if (result.text !== result.text.slice(0, 1020)) result.text = result.text.slice(0, 1020) + '...';
      try {
        message.channel.send(`**Message translated to English from ${ISO6391.getName(result.lang.from)}**\n"${result.text}"`);
      } catch {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription('<:error:784747315960479754> There was an error sending that translation');
        message.channel.send(errorEmbed);
      }
    })();
  }
};
