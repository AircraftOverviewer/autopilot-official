module.exports = {
  name: 'sensible',
  shortcut: ['sensible-heat', 'sh'],
  description: 'Calculate the Energy Transfer (Q=mcΔT) of a substance that is undergoing a change in heat to 2 decimal places',
  usage: 'ap sensible [values](<Q> <M> [<C>] <ΔT>)',
  parameters: {
    1: { name: '[values]', description: '- Values must be numbers for known variables and must have \'-\' if unknown with spacing in between values' },
    2: { name: '<Q>', description: '- Measurement for Energy Transfer. Units in Joules (J)' },
    3: { name: '<M>', description: '- Measurement for Mass. Units in Kilograms (kg)' },
    4: { name: '[<C>]', description: '- Measurement for Specific Heat Capacity. Insert name of substance from latent heat list command or a custom value. Units in J·kg⁻¹·K⁻¹' },
    5: { name: '<ΔT>', description: '- Measurement for Change in Temperature. Units in Kelvin (K)' }
  },
  execute (Discord, message, args, client) {
    if (!args[0]) {
      const help = require('./help.js');
      help.execute(Discord, message, ['sensible'], client);
      return;
    }

    if (!args[3]) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include all 3 values to calculate');
      message.channel.send(invalidEmbed);
      return;
    }

    const substances = {
      aluminium: { name: 'Aluminium', capacity: '887' },
      asphalt: { name: 'Asphalt', capacity: '915' },
      bone: { name: 'Bone', capacity: '440' },
      boron: { name: 'Boron', capacity: '1106' },
      brass: { name: 'Brass', capacity: '920' },
      brick: { name: 'Brick ', capacity: '841' },
      clay: { name: 'Clay', capacity: '878' },
      coal: { name: 'Coal', capacity: '1262' },
      cobalt: { name: 'Cobalt', capacity: '420' },
      concrete: { name: 'Concrete', capacity: '879' },
      copper: { name: 'Copper', capacity: '385' },
      glass: { name: 'Glass', capacity: '792' },
      gold: { name: 'Gold', capacity: '130' },
      granite: { name: 'Granite', capacity: '774' },
      gypsum: { name: 'Gypsum', capacity: '1090' },
      helium: { name: 'Helium', capacity: '5192' },
      hydrogen: { name: 'Hydrogen', capacity: '14300' },
      ice: { name: 'Ice', capacity: '2090' },
      iron: { name: 'Iron', capacity: '462' },
      lead: { name: 'Lead', capacity: '130' },
      limestone: { name: 'Limestone', capacity: '806' },
      lithium: { name: 'Lithium', capacity: '3580' },
      magnesium: { name: 'Magnesium', capacity: '1024' },
      marble: { name: 'Marble', capacity: '832' },
      mercury: { name: 'Mercury', capacity: '126' },
      nitrogen: { name: 'Nitrogen', capacity: '1040' },
      oak_wood: { name: 'Oak Wood', capacity: '2380' },
      oxygen: { name: 'Oxygen', capacity: '919' },
      platinum: { name: 'Platinum', capacity: '150' },
      plutonium: { name: 'Plutonium', capacity: '140' },
      quartzite: { name: 'Quartzite', capacity: '1100' },
      rubber: { name: 'Rubber', capacity: '2005' },
      salt: { name: 'Salt', capacity: '881' },
      sand: { name: 'Sand', capacity: '780' },
      sandstone: { name: 'Sandstone', capacity: '740' },
      silicon: { name: 'Silicon', capacity: '710' },
      silver: { name: 'Silver', capacity: '236' },
      soil: { name: 'Soil', capacity: '1810' },
      stainless_steel: { name: 'Stainless Steel', capacity: '468' },
      steam: { name: 'Steam', capacity: '2094' },
      sulfur: { name: 'Sulfur', capacity: '706' },
      thorium: { name: 'Thorium', capacity: '118' },
      tin: { name: 'Tin', capacity: '226' },
      titanium: { name: 'Titanium', capacity: '521' },
      tungsten: { name: 'Tungsten', capacity: '113' },
      uranium: { name: 'Uranium', capacity: '115' },
      vandium: { name: 'Vandium', capacity: '490' },
      water: { name: 'Water', capacity: '4187' },
      zinc: { name: 'Zinc', capacity: '389' }
    };

    let substance = {};

    if (args[2] in substances) substance = substances[args[2]];
    else substance = { name: 'Specific Heat Capacity', capacity: parseFloat(args[2]) };

    const Forces = {};

    Forces.Q = parseFloat(args[0]);
    Forces.M = parseFloat(args[1]);
    Forces.C = parseFloat(substance.capacity);
    Forces.T = parseFloat(args[3]);

    if (!parseFloat(substance.capacity)) {
      Forces.C = NaN;
    }

    let i = 0;

    for (const Force in Forces) {
      if (isNaN(Forces[Force])) i++;
    }

    let { Q, M, C, T } = Forces;

    if (i === 0) {
      const fiveEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include at least 1 unknown value');
      message.channel.send(fiveEmbed);
      return;
    }
    if (i === 1) {
      if (isNaN(Q)) Q = `${Q = M * C * T}`;
      if (isNaN(M)) M = `${M = Q / (C * T)}`;
      if (isNaN(C)) C = `${C = Q / (M * T)}`;
      if (isNaN(T)) T = `${T = Q / (M * C)}`;
    } else {
      const valuesEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription('<:error:784747315960479754> You must include a minimum of 3 known values');
      return message.channel.send(valuesEmbed);
    }
    const resultsEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Force Calculation - Results')
      .addFields(
        { name: 'Energy Transfer (Q)', value: `${parseFloat(Q).toFixed(2)} J` },
        { name: 'Mass (M)', value: `${parseFloat(M).toFixed(2)} kg` },
        { name: 'Specific Heat Capacity (C)', value: `${parseFloat(C).toFixed(2)} J·kg⁻¹·K⁻¹` },
        { name: 'Change in Temperature (ΔT)', value: `${parseFloat(T).toFixed(2)} K` }
      );
    message.channel.send(resultsEmbed);
  }
};
