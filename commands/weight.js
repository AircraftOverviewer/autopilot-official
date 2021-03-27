module.exports = {
  name: 'weight',
  shortcut: ['w'],
  description: 'Find the force (weight) that on object is exerts upon the surface of Earth through it\'s mass to 2 decimal places',
  usage: 'ap weight [values](<W> <M> <G>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values. When left blank, gravity will be equal to 9.81 m.s⁻²' },
    2: { name: '<W>', description: '- Measurement for Weight. Units in Newtons (N)' },
    3: { name: '<M>', description: '- Measurement for Mass. Units in Kilograms (kg)' },
    4: { name: '<G>', description: '- (Optional) Measurement for Gravity. Units in Metres per Second (m.s⁻²)' }

  },
  execute (Discord, message, args, client) {
    const Forces = {};

    Forces.W = parseFloat(args[0]);
    Forces.M = parseFloat(args[1]);
    Forces.G = '';

    let i = 0;

    if (!args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['weight'], client);
      return;
    }

    if (!args[1]) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include 2 values to calculate (excluding gravity)');
      message.channel.send(invalidEmbed);
      return;
    }

    for (const Force in Forces) {
      if (isNaN(Forces[Force])) i++;
    }

    let { W, M, G } = Forces;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value (excluding gravity)');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i === 1) {
      if (!args[2]) {
        G = 9.81;
      } else {
        G = parseFloat(args[2]);
        if (!parseFloat(G)) {
          G = 9.81;
        }
      }
      if (isNaN(W)) W = `${W = M * G}`;
      if (isNaN(M)) M = `${M = W / G}`;
      if (isNaN(G)) G = `${G = W / M}`;
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 1 known value (excluding gravity)');
      return message.channel.send(valuesEmbed);
    }
    const resultsEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Weight Calculation - Results')
      .addFields(
        { name: 'Weight (W)', value: `${parseFloat(W).toFixed(2)} N` },
        { name: 'Mass (M)', value: `${parseFloat(M).toFixed(2)} kg` },
        { name: 'Gravity (G)', value: `${parseFloat(G).toFixed(2)} m.s⁻²` }
      );
    message.channel.send(resultsEmbed);
  }
};
