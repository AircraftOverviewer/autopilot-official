module.exports = {
  name: 'specific',
  shortcut: ['list', 's'],
  description: 'Show a list of substances and their Specific Heat Capacity, or find a certain substance\'s Specific Heat Capacity',
  usage: 'ap specific ([<substance>])(<page>)',
  parameters: {
    1: { name: '[<substance>]', description: '- (Optional) Insert the name of a substance that is already in the list to show its Specific Heat Capacity. Use an underscore for substances with multiple words' },
    2: { name: '<page>', description: '- (Optional) Insert the page number for the list of substances (2 pages total)' }
  },
  execute (Discord, message, args, client) {
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

    if (args[0] in substances) substance = substances[args[0]];

    if (!substance.capacity) {
      if (!args[0] || args[0] === '1') {
        const pageOneEmbed = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setTitle('Specific Heat Capacity (J·kg⁻¹·K⁻¹) - Page 1/2')
          .addFields(
            { name: 'Aluminium', value: '887', inline: true },
            { name: 'Asphalt', value: '915', inline: true },
            { name: 'Bone', value: '440', inline: true },
            { name: 'Boron', value: '1106', inline: true },
            { name: 'Brass', value: '920', inline: true },
            { name: 'Brick ', value: '841', inline: true },
            { name: 'Clay', value: '878', inline: true },
            { name: 'Coal', value: '1262', inline: true },
            { name: 'Cobalt', value: '420', inline: true },
            { name: 'Concrete', value: '879', inline: true },
            { name: 'Copper', value: '385', inline: true },
            { name: 'Glass', value: '792', inline: true },
            { name: 'Gold', value: '130', inline: true },
            { name: 'Granite', value: '774', inline: true },
            { name: 'Gypsum', value: '1090', inline: true },
            { name: 'Helium', value: '5192', inline: true },
            { name: 'Hydrogen', value: '14300', inline: true },
            { name: 'Ice', value: '2090', inline: true },
            { name: 'Iron', value: '462', inline: true },
            { name: 'Lead', value: '130', inline: true },
            { name: 'Limestone', value: '806', inline: true },
            { name: 'Lithium', value: '3580', inline: true },
            { name: 'Magnesium', value: '1024', inline: true },
            { name: 'Marble', value: '832', inline: true }
          );
        message.channel.send(pageOneEmbed);
        return;
      }
      if (args[0] === '2') {
        const pageTwoEmbed = new Discord.MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setTitle('Specific Heat Capacity (J·kg⁻¹·K⁻¹) - Page 2/2')
          .addFields(
            { name: 'Mercury', value: '126', inline: true },
            { name: 'Nitrogen', value: '1040', inline: true },
            { name: 'Oak Wood', value: '2380', inline: true },
            { name: 'Oxygen', value: '919', inline: true },
            { name: 'Platinum', value: '150', inline: true },
            { name: 'Plutonium', value: '140', inline: true },
            { name: 'Quartzite', value: '1100', inline: true },
            { name: 'Rubber', value: '2005', inline: true },
            { name: 'Salt', value: '881', inline: true },
            { name: 'Sand', value: '780', inline: true },
            { name: 'Sandstone', value: '740', inline: true },
            { name: 'Silicon', value: '710', inline: true },
            { name: 'Silver', value: '236', inline: true },
            { name: 'Soil', value: '1810', inline: true },
            { name: 'Stainless Steal', value: '468', inline: true },
            { name: 'Steam', value: '2094', inline: true },
            { name: 'Sulfur', value: '706', inline: true },
            { name: 'Thorium', value: '118', inline: true },
            { name: 'Tin', value: '226', inline: true },
            { name: 'Titanium', value: '521', inline: true },
            { name: 'Tungsten', value: '113', inline: true },
            { name: 'Uranium', value: '115', inline: true },
            { name: 'Vandium', value: '490', inline: true },
            { name: 'Water', value: '4187', inline: true },
            { name: 'Zinc', value: '389', inline: true }
          );
        message.channel.send(pageTwoEmbed);
        return;
      }
      if (args[0] !== ('1' || '2')) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setDescription('<:error:784747315960479754> That substance or page number was not found');
        message.channel.send(errorEmbed);
        return;
      }
    }
    const resultsEmbed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle('Specific Heat Capacity (J·kg⁻¹·K⁻¹)')
      .addFields(
        { name: substance.name, value: `${substance.capacity} J·kg⁻¹·K⁻¹` }
      );
    message.channel.send(resultsEmbed);
  }
};
