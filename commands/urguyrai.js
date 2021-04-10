module.exports = {
  name: 'urguyrai',
  execute (Discord, message, client) {
    const twitch = 'https://www.twitch.tv/urguyrai'
    const youtube = 'https://www.youtube.com/channel/UCcQs6tLozpMNmHKzZ-X05-w'
    const discord = 'https://discord.com/invite/GYpByNzrfv'
    const UrGuyRaiEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('**UrGuyRai - Links**')
      .setDescription('Here are all of my links consolidated into one place. Make sure to check out as many as you can to help support me. :)')
      .addFields(
        { name:  '\u200B', value: `**<:Twitch:830456268783091832> - [Twitch](${twitch})**\nCome follow me and help support the stream!!` },
        { name: '\u200B', value: `**<:YouTube:830456244967833681> - [YouTube](${youtube})**\nCome sub to me if you would like, I post a variety of things from my streams` },
        { name:  '\u200B', value: `**<:Discord:830460910590099486> - [Discord](${discord})**\nHere is where my community is able to talk and hang out!!` },
        { name: '\u200B', value: '**Thanks for all the support!**\nIt is much appreciated. I hope to see and talk to you all very soon!' }
      )
      .setImage('https://cdn.discordapp.com/attachments/825194443110875140/830463689068642344/UrGuyRai_Icon_Full.png')
      .setTimestamp()
      .setFooter('UrGuyRai\'s Twitch Community')
    message.channel.send(UrGuyRaiEmbed);
  }
}
