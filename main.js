const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'ap ';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.username} Connected! :D`);
  client.user.setActivity('ap help - Enjoy!', { type: 'LISTENING' });
});

let counter = 0;

client.on('message', message => {

  if (message.guild.id === '824362037911879690') {
    if(++counter === 51){
      client.commands.get('urguyrai').execute(Discord, message);
      counter = 0;
    }
  }
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
    if (message.guild.me.hasPermission('SEND_MESSAGES')) {
      const adminEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> This bot requires the administrator permission to have full functionality. Please grant this permission or contact an admin to fix this');
      message.channel.send(adminEmbed);
      return;
    } else {
      return;
    }
  }

  const args = message.content.slice(3).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const file = client.commands.get(command) || client.commands.find(cmd => cmd.shortcut && cmd.shortcut.includes(command));

  if (!file) return;

  file.execute(Discord, message, args, client);
});

client.login(process.env.token);

// Use "(config.token)" when debugging offline & add "const config = require('./config.json');". Use "(process.env.token)" when pushing to Heroku
