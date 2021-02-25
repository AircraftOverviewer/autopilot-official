module.exports = {
  name: 'uptime',
  description: 'Checks to see when the bot was last reset/rebooted',
  usage: '!uptime',
  execute (Discord, message, args, client) {
    let totalSeconds = client.uptime / 1000;
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let displayDays = '';
    let displayHours = '';
    let displayMinutes = '';
    let displaySeconds = '';

    if (days === 1) displayDays = '**1** day'; else displayDays = `**${days}** days`;
    if (hours === 1) displayHours = '**1** hour'; else displayHours = `**${hours}** hours`;
    if (minutes === 1) displayMinutes = '**1** minute'; else displayMinutes = `**${minutes}** minutes`;
    if (seconds === 1) displaySeconds = '**1** second'; else displaySeconds = `**${seconds}** seconds`;

    let uptime = '';

    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          uptime = `${displaySeconds}`;
        } else {
          uptime = `${displayMinutes} and ${displaySeconds}`;
        }
      } else {
        uptime = `${displayHours}, ${displayMinutes} and ${displaySeconds}`;
      }
    } else {
      uptime = `${displayDays}, ${displayHours}, ${displayMinutes} and ${displaySeconds}`;
    }

    message.channel.send(`Bot last offline ${uptime} ago`);
  }
};
