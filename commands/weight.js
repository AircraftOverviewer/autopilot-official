module.exports = {
  name: 'weight',
  shortcut: ['w'],
  description: 'Check the weight of objects that exist on Earth compared to what they\'d be in different parts of the Solar System and beyond to 2 decimal places',
  usage: '!weight [gravity] <weight>',
  parameters: {
    1: { name: '[gravity]', description: '- Input a gravity value in m.s⁻² or input the name of a preset environment (sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto)' },
    2: { name: '<weight>', description: '- Input the weight on Earth of an object you want to compare in kg' }
  },
  execute (Discord, message, args, client) {
    if (!args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['weight'], client);
      return;
    }

    if (!args[1]) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> Enter a value for the weight of the object on Earth');
      return message.channel.send(errorEmbed);
    }

    const planets = {
      sun: { name: 'Sun', gravity: 274 },
      moon: { name: 'Moon', gravity: 1.62 },
      mercury: { name: 'Mercury', gravity: 3.7 },
      venus: { name: 'Venus', gravity: 8.87 },
      mars: { name: 'Mars', gravity: 3.711 },
      jupiter: { name: 'Jupiter', gravity: 24.79 },
      saturn: { name: 'Saturn', gravity: 10.44 },
      uranus: { name: 'Uranus', gravity: 8.87 },
      neptune: { name: 'Neptune', gravity: 11.15 },
      pluto: { name: 'Pluto', gravity: 0.62 }
    };

    let planet = {};

    if (args[0] in planets) planet = planets[args[0]];
    else planet = { name: 'Custom Planet', gravity: parseFloat(args[0]) };

    if (!planet.gravity) {
      const gravityEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> Enter a value for gravity (planet name or custom value)');

      return message.channel.send(gravityEmbed);
    }

    const weight = parseFloat(args[1]);

    if (!weight) {
      const weightEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> Enter a value for weight (kg)');

      return message.channel.send(weightEmbed);
    }

    const result = `${(weight / 9.81) * planet.gravity}`;

    const resultEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Weight Calculation - Result')
      .addFields(
        { name: 'Gravity', value: `${planet.gravity} m.s⁻²` },
        { name: 'Weight on Earth', value: `${weight} kg` },
        { name: `Weight on ${planet.name}`, value: `${parseFloat(result).toFixed(2)} kg` }
      );

    message.channel.send(resultEmbed);
  }
};
