const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const connectingTimestamp = new Date().getTime();

console.log('Connecting...');

client.once('ready', () => {
  const connectedTimestamp = new Date().getTime();
  const connectingTime = connectedTimestamp - connectingTimestamp;
  console.log('Autopilot connected in ' + connectingTime + ' ms');
  client.user.setActivity('!help - Enjoy!', { type: 'LISTENING' });
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const file = client.commands.get(command) || client.commands.find(cmd => cmd.shortcut && cmd.shortcut.includes(command));

  if (!file) return;

  file.execute(Discord, message, args, client);
});

client.login(process.env.token);

// Use "(config.token)" when debugging offline & add "const config = require('./config.json')". Use "(process.env.token)" when pushing to Heroku
