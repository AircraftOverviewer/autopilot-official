module.exports = {
  name: 'emoji',
  description: 'Send any emoji within this server, including animated emojis',
  usage: 'ap emoji [emoji_name]',
  parameters: {
    1: { name: '[emoji_name]', description: '- The full name of the emoji you wish to send. Does not need to be case-sensitive' }
  },
  async execute (Discord, message, args, client) {
    if (!args[0]) {
      const arg = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include an emoji to send');
      message.channel.send(arg);
      return;
    }

    let emoji;

    emoji = message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === args[0].toLowerCase());
    if (!emoji) emoji = message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase().startsWith(args[0].toLowerCase()));

    const error = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> Unable to locate that emoji');
    if (!emoji) return message.channel.send(error);

    await message.delete();
    message.channel.send(emoji.toString());
  }
};
