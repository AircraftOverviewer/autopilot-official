module.exports = {
  name: 'unmute',
  description: '(admin only) Remove the "Muted" role to a user',
  usage: 'ap mute [user]',
  parameters: {
    1: { name: '[user]', description: '- Tag the user you wish to unmute. Cannot be a server moderator. You must have a muted role called "Muted" and it must be above your general permission role' }
  },
  execute (Discord, message, args, client) {
    const { member, mentions } = message;
    const taggedUser = message.mentions.users.first();
    const tag = `<@${member.id}>`;
    const role = member.guild.roles.cache.find(role => role.name === 'Muted');
    const permissionEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You cannot change administrative permissions');
    const unmutedEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`:speaker: ${tag} has revoked ${taggedUser}'s mute`);
    const unknownEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setDescription('<:error:784747315960479754> You did not specify who to unmute');
    const nopermsEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Sorry!')
      .setDescription('<:error:784747315960479754> You do you have permission to unmute members');
    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('MUTE_MEMBERS') ||
      member.hasPermission('MANAGE_MESSAGES') ||
      member.hasPermission('MANAGE_CHANNELS')
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
        targetMember.roles.remove(role);
        message.channel.send(unmutedEmbed);
      } else {
        message.channel.send(unknownEmbed);
      }
    } else {
      message.channel.send(nopermsEmbed);
    }
  }
};
