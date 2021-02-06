module.exports = {
  name: 'coinflip',
  description: 'Flips a coin. 50/50 for Heads & Tails',
  aliases: ['coin', 'flip', 'cf'],
  execute (Discord, message, args, client) {
    const responses = [
      '**<:Coin:792679862481059890> Heads**',
      '**<:Coin:792679862481059890> Tails**'
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send('<a:CoinFlip:792678734813200414> **Flipping a Coin...**')
      .then(msg => {
        setTimeout(function () {
          msg.delete();
          message.channel.send(response);
        }, 1500);
      });
  }
};
