module.exports = {
  name: 'kick',
  description: '(admin only) Remove a user from the server',
  usage: '!kick [user]',
  parameters: {
    1: { name: '[user]', description: '- Tag the user you wish to kick. Cannot be a server moderator' }
  },
  execute (Discord, message, args, client) {
    const { member, mentions } = message;
    const taggedUser = message.mentions.users.first();
    const tag = `<@${member.id}>`;
    const permissionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You cannot kick someone with administrative permissions');
    const kickedEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`${tag} has kicked the user ${taggedUser} from the server`);
    const unknownEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You did not specify who to kick');
    const specificationEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You must respond with either **Y** or **N**');
    const timeEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription('<:error:784747315960479754> You must respond within 10 seconds. Operation cancelled');
    const cancelledEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(':white_check_mark: Operation cancelled');
    const confirmationEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`${tag} are you sure you want to kick ${taggedUser}? **(Y/N)**`);
    const nopermsEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You do not have permission to kick users');
    if (
      member.hasPermission('ADMINISTRATOR') ||
        member.hasPermission('KICK_MEMBERS')
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
            message.channel.send(kickedEmbed);
            targetMember.kick();
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
