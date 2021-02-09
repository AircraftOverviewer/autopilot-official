module.exports = {
  name: 'ban',
  description: '(admin only) Permenantly ban a user from the server',
  usage: '!ban [user]',
  parameters: {
    1: { name: '[user]', description: '- Tag the user you wish to ban. Cannot be a server moderator' }
  },
  execute (Discord, message, args, client) {
    const { member, mentions } = message;
    const taggedUser = message.mentions.users.first();
    const tag = `<@${member.id}>`;
    const permissionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You cannot ban someone with administrative permissions');
    const bannedEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`${tag} has ejected ${taggedUser} into the stratosphere and burnt their birthday invitation back`)
      .setImage('https://media1.tenor.com/images/ae83976e867ebc2722054a632ff045ad/tenor.gif?itemid=11035060');
    const unknownEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You did not specify who to ban');
    const specificationEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You must respond with either **Y** or **N**');
    const timeEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You must respond within 10 seconds. Operation cancelled');
    const cancelledEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(':white_check_mark: Operation cancelled');
    const confirmationEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`${tag} are you sure you want to ban ${taggedUser}? All bans are final **(Y/N)**`);
    const nopermsEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You do not have permission to ban users');
    if (
      member.hasPermission('ADMINISTRATOR') ||
        member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first();
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        if (
          targetMember.hasPermission('ADMINISTRATOR')
        ) {
          message.channel.send(permissionEmbed);
          return;
        }
        message.channel.send(confirmationEmbed);
        message.channel.awaitMessages(m => m.author.id === message.author.id,
          { max: 1, time: 10000 }).then(collected => {
          if (collected.first().content.toLowerCase() === 'y') {
            message.channel.send(bannedEmbed);
            targetMember.ban();
          } else if (collected.first().content.toLowerCase() === 'n') {
            message.channel.send(cancelledEmbed);
          } else {
            message.channel.send(specificationEmbed);
          }
        }).catch(() => {
          message.channel.send(timeEmbed);
        });
      } else {
        message.channel.send(unknownEmbed);
      }
    } else {
      message.channel.send(nopermsEmbed);
    }
  }
};
