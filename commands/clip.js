module.exports = {
  name: 'clip',
  description: 'Take a screenshot of any website URL and site the website. Can also be used with image spoilers',
  shortcut: ['site'],
  usage: '!clip [website] <-s>',
  parameters: {
    1: { name: '[website]', description: '- Paste in a URL for the bot to screenshot. Invalid URLs will result in a while screenshot' },
    2: { name: '<-s>', description: '- (Optional) Type \'-s\' after the URL to make the screenshot a spoiler' }
  },
  execute (Discord, message, args, client) {
    const puppeteer = require('puppeteer');
    if (!args[0]) {
      const errEmbed = new Discord.MessageEmbed()
        .setColor('#dd2e44')
        .setDescription('<:error:784747315960479754>  You must specify a website to convert');
      message.channel.send(errEmbed);
    } else {
      message.channel.startTyping();
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
          page.goto(args[0]);
          varURL = args[0];
        } else {
          page.goto('https://' + args[0]);
          varURL = `https://${args[0]}`;
        }
        await page.waitForNavigation();
        await page.screenshot({ path: './images/site.png' });
        await browser.close();
        if (args[1] === '-s') {
          name = 'SPOILER_site';
        } else {
          name = 'site';
        }
        await message.channel.send({
          files: [{
            attachment: './images/site.png',
            name: name + '.png'
          }]
        });
        const siteEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(':white_check_mark: Here is your Link!')
          .setDescription(`Source: ${varURL}`);
        message.channel.send(siteEmbed);
      })().catch(() => {
        message.channel.send('<:error:784747315960479754> Sorry an error was encountered');
      });
      message.channel.stopTyping();
    }
  }
};
