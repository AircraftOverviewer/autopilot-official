module.exports = {
  name: 'emoji',
  description: 'Send any emoji within a given server, including animated emojis',
  usage: '!emoji [emoji_name]',
  parameters: {
    1: { name: '[emoji_name]', description: '- The full name of the emoji you wish to send. Does not need to be case-sensitive' }
  },
  execute (Discord, message, args, client) {
    const emojis = client.emojis.cache.filter(e => e.name.toLowerCase() === args.join(' ').toLowerCase());

    let content = '';

    emojis.forEach(emoji => {
      content = `${content} ${emoji}`;
    });

    message.channel.send(content)
      .then(function () {
        message.delete();
      })
      .catch(function () {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription('<:error:784747315960479754> There was an error finding that emoji');
        message.channel.send(errorEmbed);
      });
  }
};
