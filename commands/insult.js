module.exports = {
  name: 'insult',
  description: 'Have the bot insult a user of your choice',
  usage: '!insult [user]',
  parameters: {
    1: { name: '[user]', description: '- Enter the tag of the user you want to insult' }
  },
  execute (Discord, message, args, client) {
    const insulter = require('insult');
    const taggedUser = message.mentions.users.first();
    if (args[0]) {
      if (!taggedUser) {
        const userEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription('<:error:784747315960479754> That user was not found');
        message.channel.send(userEmbed);
      } else {
        message.channel.send(`${taggedUser} ${insulter.Insult()}`);
      }
    } else {
      const tagEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must tag the user you with to insult');
      message.channel.send(tagEmbed);
    }
  }
};
