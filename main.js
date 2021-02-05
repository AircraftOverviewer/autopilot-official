const Discord = require('discord.js');
const client = new Discord.Client()

const connectingTimestamp = new Date().getTime();

console.log('Connecting...');

client.once('ready', () => {
    const connectedTimestamp = new Date().getTime();
    const connectingTime = connectedTimestamp - connectingTimestamp
    console.log("Autopilot connected in " + connectingTime + ' ms');
    client.user.setActivity('!help - Enjoy!', { type: 'LISTENING' });
});

client.login(process.env.token);