module.exports = {
  name: 'suvat',
  description: 'Calculate motion in a given direction when acceleration is constant using a minimum of 3 known values from the Kinetic Equation (SUVAT) to find the remaining unknowns',
  usage: '!suvat [values](<S> <U> <V> <A> <T>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values' },
    2: { name: '<S>', description: '- Measurement for Displacement. Units in Metres (m)' },
    3: { name: '<U>', description: '- Measurement for Initial Velocity. Units in Metres per Second (m.s⁻¹)' },
    4: { name: '<V>', description: '- Measurement for Final Velocity. Units in Metres per Second (m.s⁻¹)' },
    5: { name: '<A>', description: '- Measurement for Acceleration. Units in Metres per Second (m.s⁻²)' },
    6: { name: '<T>', description: '- Measurement for Time. Units in Seconds (s)' }
  },
  execute (Discord, message, args, client) {
    const SUVATs = {};

    SUVATs.S = parseFloat(args[0]);
    SUVATs.U = parseFloat(args[1]);
    SUVATs.V = parseFloat(args[2]);
    SUVATs.A = parseFloat(args[3]);
    SUVATs.T = parseFloat(args[4]);

    let i = 0;

    if (i === 5 || !args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['suvat'], client);
      return;
    }

    if (!args[4]) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include 5 SUVAT values to calculate');
      message.channel.send(invalidEmbed);
      return;
    }

    for (const SUVAT in SUVATs) {
      if (isNaN(SUVATs[SUVAT])) i++;
    }

    let { S, U, V, A, T } = SUVATs;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i < 2) {
      if (isNaN(S)) S = `${(V * T) - (0.5 * A * T * T)}`;
      if (isNaN(U)) U = `${V - (A * T)}`;
      if (isNaN(V)) V = `${U + (A * T)}`;
      if (isNaN(A)) A = `${(V - U) / T}`;
      if (isNaN(T)) T = `${(V - U) / A}`;
    } else if (i === 2) {
      switch (true) {
        case isNaN(S):
          switch (true) {
            case isNaN(U):
              S = `${(V * T) - (0.5 * A * T * T)}`;
              U = `${V - (A * T)}`;
              break;

            case isNaN(V):
              S = `${(U * T) + (0.5 * A * T * T)}`;
              V = `${U + (A * T)}`;
              break;

            case isNaN(A):
              S = `${(T / 2) * (U + V)}`;
              A = `${(V - U) / T}`;
              break;

            case isNaN(T):
              S = `${((U * U) + (V * V)) / (2 * A)}`;
              T = `${(V - U) / A}`;
              break;
          }
          break;

        case isNaN(U):
          switch (true) {
            case isNaN(V):
              U = `${(S - (A * T * T)) / (2 * T)}`;
              V = `${(S + (A * T * T)) / (2 * T)}`;
              break;

            case isNaN(A):
              U = `${((2 * S) / T) + V}`;
              A = `${(2 * ((V * T) - S)) / (T * T)}`;
              break;

            case isNaN(T):
              U = `${Math.sqrt((2 * A * S) - (V * V))}`;
              T = `${(V - Math.sqrt((V * V) - (2 * A * S))) / A}`;
              break;
          }
          break;

        case isNaN(V):
          switch (true) {
            case isNaN(A):
              V = `${((2 * S) / T) - U}`;
              A = `${(2 * (S - (U * T))) / (T * T)}`;
              break;

            case isNaN(T):
              V = `${Math.sqrt((U * U) + (2 * A * S))}`;
              T = `${(Math.sqrt((2 * A * S) + (U * U)) - U) / A}`;
              break;
          }
          break;

        case isNaN(A):
          A = `${((V * V) - (U * U)) / (2 * S)}`;
          T = `${(2 * S) / (U + V)}`;
          break;
      }
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 3 known values');
      return message.channel.send(valuesEmbed);
    }
    const suvatEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('SUVAT Calculation - Results')
      .setDescription(`
      **Displacement (S)**\n${S} m
      \n**Initial Velocity (U)**\n${U} m.s⁻¹
      \n**Final Velocity (V)**\n${V} m.s⁻¹
      \n**Acceleration (A)**\n${A} m.s⁻²
      \n**Time (T)**\n${T} s
      `);
    message.channel.send(suvatEmbed);
  }
};
