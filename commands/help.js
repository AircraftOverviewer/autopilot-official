module.exports = {
  name: 'help',
  shortcut: ['commands'],
  description: 'Find information on different commands or get a list of commands to use',
  usage: 'ap help [command]',
  parameters: {
    1: { name: '[command]', description: '- (Optional) Insert desired command to see information for it. If left blank, a command list will be sent' }
  },
  execute (Discord, message, args, client) {
    if (args[0]) {
      const file = client.commands.get(args[0]) || client.commands.find(cmd => cmd.shortcut && cmd.shortcut.includes(args[0]));

      if (!file) {
        const help = require('./help.js');
        help.execute(Discord, message, [''], client);
      } else {
        const { name, description, usage } = file;

        const helpEmbed = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setTitle(`**Help - ${name}**`)
          .setDescription(description);

        if (file.parameters) {
          const { parameters } = file;
          let value = '';
          for (let param in parameters) {
            param = parameters[param];
            value = `${value}**${param.name}** ${param.description}\n`;
          }
          helpEmbed.addField('**Usage**', `\`\`\`${usage}\`\`\`\n${value}`);
        } else {
          helpEmbed.addField('**Usage**', `\`\`\`${usage}\`\`\``);
        }

        if (file.shortcut) {
          const { shortcut } = file;
          if (shortcut.length === 1) {
            helpEmbed.addField('**Shortcut**', shortcut[0]);
          } else {
            helpEmbed.addField('**Shortcuts**', shortcut.join(', '));
          }
        }

        if (message.channel.type === 'text') {
          message.channel.send(helpEmbed);
        }
      }
    } else {
      const helpEmbed = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle('**Commands**')
        .setDescription('Hi there! This is a project from `3301#4977` to bring fun to you all in an entertaining and administrative bot. My prefix is `ap`, feel free to search any commands you do not know with `ap help [command]`. My commands are as follows:');

      for (const command of client.commands) {
        helpEmbed.addField(`**${command[1].name}**`, command[1].description, true);
      }

      if (message.channel.type === 'text') {
        message.channel.send(helpEmbed);
      }
    }
  }
};
