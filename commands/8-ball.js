module.exports = {
  name: '8-ball',
  shortcut: ['8', '8-b', '8ball'],
  description: 'Shakes a magic 8-ball. 50% chance good reading, 25% chance bad, 25% chance neutral',
  usage: '!8-ball [question]',
  parameters: {
    1: { name: '[question]', description: '- Insert the question you wish to ask the Magic 8-Ball' }
  },
  execute (Discord, message, args, client) {
    const responses = [
      '**As I see it, yes**',
      '**Ask again later**',
      '**Better not tell you now**',
      '**Cannot predict now**',
      '**Concentrate and ask again**',
      '**Don\'t count on it**',
      '**It is certain**',
      '**It is decidedly so**',
      '**Most likely**',
      '**My reply is no**',
      '**My sources say no**',
      '**Outlook not so good**',
      '**Outlook good**',
      '**Reply hazy, try again**',
      '**Signs point to yes**',
      '**Very doubtful**',
      '**Without a doubt**',
      '**Yes**',
      '**Yes - definitely**',
      '**You may rely on it**'
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    const errorEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> Sorry you need to give me a question to answer');
    if (!args[0]) {
      message.channel.send(errorEmbed);
    } else {
      message.channel.send('<a:8ballspin:775882518049325116> **Contacting the Oracle...**')
        .then(message => {
          message.channel.startTyping();
          message.channel.stopTyping();
          message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 5000 })
            .then(collected => {
              message.delete();
              message.channel.send(response);
            });
        });
    }
  }
};
