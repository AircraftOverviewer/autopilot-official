module.exports = {
  name: 'force',
  shortcut: ['f'],
  description: 'Calculate force acting on an object using Newton\'s Second Law of Motion using the Basic Equation of Motion (F=ma) to 2 decimal places',
  usage: '!force [values](<F> <M> <A>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values' },
    2: { name: '<F>', description: '- Measurement for Force. Units in Newtons (N)' },
    3: { name: '<M>', description: '- Measurement for Mass. Units in Kilograms (kg)' },
    4: { name: '<A>', description: '- Measurement for Acceleration. Units in Metres per Second (m.s⁻²)' }
  },
  execute (Discord, message, args, client) {
    const Forces = {};

    Forces.F = parseFloat(args[0]);
    Forces.M = parseFloat(args[1]);
    Forces.A = parseFloat(args[2]);

    let i = 0;

    if (i === 3 || !args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['force'], client);
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

    let { F, M, A } = Forces;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i === 1) {
      if (isNaN(F)) F = `${F = M * A}`;
      if (isNaN(M)) M = `${M = F / A}`;
      if (isNaN(A)) A = `${A = F / M}`;
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 2 known values');
      return message.channel.send(valuesEmbed);
    }
    const suvatEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Force Calculation - Results')
      .addFields(
        { name: 'Force (F)', value: `${parseFloat(F).toFixed(2)} N` },
        { name: 'Mass (M)', value: `${parseFloat(M).toFixed(2)} kg` },
        { name: 'Acceleration (A)', value: `${parseFloat(A).toFixed(2)} m.s⁻²` }
      );
    message.channel.send(suvatEmbed);
  }
};
