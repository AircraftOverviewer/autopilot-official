module.exports = {
  name: 'purge',
  aliases: ['clear'],
  description: '(admin only) Bulk-delete messages, up to 100 at a time',
  usage: '!purge <number>',
  parameters: {
    1: { name: '<number>', description: '- Enter the total number of messages that you wish to purge' }
  },
  execute (Discord, message, args, client) {
    const { member } = message;
    const nullErrorEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You must specify how many messages to delete');
    const unknownErrorEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> The bot has encountered an error. If you are deleting messages from over 14 days ago this error may occur');
    const nopermsEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You do not have permissions to purge messages');
    const amount = parseInt(args[0]) + 1;
    if (
      member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('MANAGE_MESSAGES') ||
    member.hasPermission('MANAGE_CHANNELS')
    ) {
      if (isNaN(amount)) {
        return message.channel.send(nullErrorEmbed);
      } else if (amount === 1) {
        message.channel.send(nullErrorEmbed);
      } else if (amount > 99) {
        message.channel.bulkDelete(99);
      } else {
        message.channel.bulkDelete(amount, true).catch(m => {
          message.channel.send(unknownErrorEmbed);
        });
      }
    } else {
      message.channel.send(nopermsEmbed);
    }
  }
};
