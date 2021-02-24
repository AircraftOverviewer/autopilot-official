module.exports = {
  name: 'ohms',
  shortcut: ['Ω'],
  description: 'Calculate Voltage, Current & Resistance using Ohms Law (V=IR)',
  usage: '!force [values](<V> <I> <R>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values' },
    2: { name: '<V>', description: '- Measurement for Voltage. Units in Volts (V)' },
    3: { name: '<I>', description: '- Measurement for Current. Units in Amperes (A)' },
    4: { name: '<R>', description: '- Measurement for Resistance. Units in Ohms (Ω)' }
  },
  execute (Discord, message, args, client) {
    const Ohms = {};

    Ohms.V = parseFloat(args[0]);
    Ohms.I = parseFloat(args[1]);
    Ohms.R = parseFloat(args[2]);

    let i = 0;

    if (i === 3 || !args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['ohms'], client);
      return;
    }

    if (!args[2]) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include all 3 values to calculate');
      message.channel.send(invalidEmbed);
      return;
    }

    for (const Ohm in Ohms) {
      if (isNaN(Ohms[Ohm])) i++;
    }

    let { V, I, R } = Ohms;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i === 1) {
      if (isNaN(V)) V = `${V = I * R}`;
      if (isNaN(I)) I = `${I = V / R}`;
      if (isNaN(R)) R = `${R = V / I}`;
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 2 known values');
      return message.channel.send(valuesEmbed);
    }
    const suvatEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Ohms Calculation - Results')
      .addFields(
        { name: 'Voltage (V)', value: `${V} V` },
        { name: 'Current (I)', value: `${I} A` },
        { name: 'Resistance (R)', value: `${R} Ω` }
      );
    message.channel.send(suvatEmbed);
  }
};
