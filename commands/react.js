module.exports = {
  name: 'react',
  description: 'React to the latest message in a channel with any emoji within a given server, including animated emojis',
  usage: '!react [emoji_name]',
  parameters: {
    1: { name: '[emoji_name]', description: '- The full name of the emoji you wish to react with. Does not need to be case-sensitive' }
  },
  async execute (Discord, message, args, client) {
    if (!args[0]) {
      const emojiEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include an emoji to react with');
      message.channel.send(emojiEmbed);
      return;
    }

    const emoji = guild.emojis.cache.filter(e => e.name.toLowerCase() === args[0].toLowerCase()).first();

    if (!emoji) {
      const nullEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> There was an error finding that emoji');
      message.channel.send(nullEmbed);
      return;
    }

    const result = await message.channel.messages.fetch({ limit: 2 });

    const _result = result.array()[1];

    if (!_result || _result === '') {
      const emojiEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> There was en error locating a message to react to');
      message.channel.send(emojiEmbed);
      return;
    }

    await message.delete();
    _result.emojis.first();
  }
};
