module.exports = {
  name: 'latent',
  shortcut: ['lh'],
  description: 'Calculate the Latent Heat of a substance (Q=mL) to 2 decimal places',
  usage: 'ap latent [values](<Q> <M> <L>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values' },
    2: { name: '<Q>', description: '- Measurement for Energy Transfer. Units in Joules (J)' },
    3: { name: '<M>', description: '- Measurement for Mass. Units in Kilograms (kg)' },
    4: { name: '<L>', description: '- Measurement for Specific Latent Heat. Units in J·kg⁻¹' }
  },
  execute (Discord, message, args, client) {
    const Forces = {};

    Forces.Q = parseFloat(args[0]);
    Forces.M = parseFloat(args[1]);
    Forces.L = parseFloat(args[2]);

    let i = 0;

    if (i === 3 || !args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['latent'], client);
      return;
    }

    if (!args[2]) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include all 3 values to calculate');
      message.channel.send(invalidEmbed);
      return;
    }

    for (const Force in Forces) {
      if (isNaN(Forces[Force])) i++;
    }

    let { Q, M, L } = Forces;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i === 1) {
      if (isNaN(Q)) Q = `${Q = M * L}`;
      if (isNaN(M)) M = `${M = Q / L}`;
      if (isNaN(L)) L = `${L = Q / M}`;
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 2 known values');
      return message.channel.send(valuesEmbed);
    }
    const resultsEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Latent Heat Calculation - Results')
      .addFields(
        { name: 'Energy Transfer (Q)', value: `${parseFloat(Q).toFixed(2)} J` },
        { name: 'Mass (M)', value: `${parseFloat(M).toFixed(2)} kg` },
        { name: 'Latent Heat (L)', value: `${parseFloat(L).toFixed(2)} J·kg⁻¹` }
      );
    message.channel.send(resultsEmbed);
  }
};
