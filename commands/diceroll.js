module.exports = {
  name: 'diceroll',
  description: 'Roll up to 5 standard die. 16.66% chance for each number',
  shortcut: ['dice', 'roll', 'dr'],
  usage: '!diceroll <number>',
  parameters: {
    1: { name: '<number>', description: '- Choose the number of die you wish to roll, 5 maximum' }
  },
  execute (Discord, message, args, client) {
    const random = require('random');
    const fiveEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You cannot roll more than 5 dice at a time');
    if (args[0] > 5) {
      message.channel.send(fiveEmbed);
    } else {
      const outcomes = {
        1: '<:Dice1:793040525577289730> One',
        2: '<:Dice2:793040511451529237> Two',
        3: '<:Dice3:793040499245580289> Three',
        4: '<:Dice4:793040485118902282> Four',
        5: '<:Dice5:793040469269413888> Five',
        6: '<:Dice6:793040439812554802> Six'
      };

      let dice = 1;
      if (parseInt(args[0])) dice = parseInt(args[0]);

      let result = '';

      for (let i = 0; i < dice; i++) {
        result += `${outcomes[random.int(1, 6)]}\n`;
      }

      message.channel.send(result)
        .catch(function () {
          const errorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('<:error:784747315960479754> There was an error rolling the dice');
          message.channel.send(errorEmbed);
        });
    }
  }
};
