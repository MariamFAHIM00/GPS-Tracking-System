const Zone = require('../models/Zone');

const data = {
  zones: [
    {
      name: "Marrakech",
      coordinates: [
        {latitude: 31.71643179289622, longitude: -8.126642761581508},
        {latitude: 31.694817496031447, longitude: 7.925455646879869},
        {latitude: 31.566196125450457, longitude: -7.891123374746483},
        {latitude: 31.56795124883488, longitude: -8.082010807808107}
      ]
    },
    {
      name: "Agadir",
      coordinates: [
        {latitude: 30.470357799173293, longitude: -9.666494951214695},
        {latitude: 30.47176773152633, longitude: -9.642365872042362},
        {latitude: 30.43827632443614, longitude: -9.608421574223655},
        {latitude: 30.45766748946141, longitude: -9.558118578660995},
        {latitude: 30.408300574332593, longitude: -9.49840933189556},
        {latitude: 30.37549302999811, longitude: -9.490638950467183},
        {latitude: 30.372317521712155, longitude: -9.516403899413913},
        {latitude: 30.382196542070254, longitude: -9.51681286685751},
        {latitude: 30.38501893591853, longitude: -9.507815583098337},
        {latitude: 30.402657050400663, longitude: -9.526628085503882},
        {latitude: 30.38501893591853, longitude: -9.539715043699047},
        {latitude: 30.38607731259553, longitude: -9.538079173924652},
        {latitude: 30.38149093087152, longitude: -9.528263955278279},
        {latitude: 30.376904333903987, longitude: -9.53071775993987},
        {latitude: 30.382196542070254, longitude: -9.601878095126075},
        {latitude: 30.421702636176228, longitude: -9.61414711843404},
        {latitude: 30.41570720442317, longitude: -9.63132375106519},
        {latitude: 30.42875561368116, longitude: -9.651772123245134}
      ]
    },
    {
      name: "Essaouira",
      coordinates: [
        {latitude: 31.508251831911178, longitude: -9.75626707880055},
        {latitude: 31.518236550870693, longitude: -9.750132214627119},
        {latitude: 31.524654735385596, longitude: -9.749388594727309},
        {latitude: 31.52671479988989, longitude: -9.75329259920131},
        {latitude: 31.52671479988989, longitude: -9.754593934025978},
        {latitude: 31.51696870918547, longitude: -9.76649185242294},
        {latitude: 31.5162555406773, longitude: -9.770860619334323},
        {latitude: 31.51514615662302, longitude: -9.772533764108896},
        {latitude: 31.509361297810464, longitude: -9.775136433758233},
        {latitude: 31.5058743606381, longitude: -9.775229386245709},
        {latitude: 31.510391504353194, longitude: -9.770674714359371},
        {latitude: 31.502545799267192, longitude: -9.764539850185937},
        {latitude: 31.498424559085638, longitude: -9.765376422573224},
        {latitude: 31.49826604622009, longitude: -9.765283470085746},
        {latitude: 31.495571286392632, longitude: -9.759706320837171},
        {latitude: 31.496205354514984, longitude: -9.754036219101119},
        {latitude: 31.498107533085847, longitude: -9.75208421686412}
      ]
    },
    {
      name: "Casablanca",
      coordinates: [
        {latitude: 33.61510714852334, longitude: -7.651834591284178},
        {latitude: 33.61068371270808, longitude: -7.582194358229348},
        {latitude: 33.64852132523591, longitude: -7.488357095045299},
        {latitude: 33.621987597450826, longitude: -7.456487835850716},
        {latitude: 33.566928628276074, longitude: -7.493078466777829},
        {latitude: 33.51232659469353, longitude: -7.586915729961878},
        {latitude: 33.495102586038115, longitude: -7.665998706481769},
        {latitude: 33.53495864966098, longitude: -7.7014089944757504},
        {latitude: 33.574796346865575, longitude: -7.71439276674021}
      ]
    },
    {
      name: "Rabat",
      coordinates: [
        {latitude: 33.96068500372421, longitude: -6.923083012263428},
        {latitude: 34.03675099966532, longitude: -6.83493814771522},
        {latitude: 34.02114475707572, longitude: -6.80248481122247},
        {latitude: 34.00686419128847, longitude: -6.813703248528605},
        {latitude: 33.993577787720085, longitude: -6.791667032391553},
        {latitude: 33.927447052938916, longitude: -6.794471641718087},
        {latitude: 33.91115572005681, longitude: -6.803686786648127},
        {latitude: 33.904837834565605, longitude: -6.846557243496574},
        {latitude: 33.9407437906267, longitude: -6.886623091018487}
    ]
    },
    {
      name: "Tanger",
      coordinates: [
        {latitude: 35.79142659549032, longitude: -5.796949941940409},
        {latitude: 35.817610473626885, longitude: -5.751044408340838},
        {latitude: 35.824973134040206, longitude: -5.722290392789458},
        {latitude: 35.72551962021438, longitude: -5.721785936376276},
        {latitude: 35.71364237596626, longitude: -5.742973105729924},
        {latitude: 35.700124737659614, longitude: -5.7934187470481335},
        {latitude: 35.72633867524391, longitude: -5.945764583829128},
        {latitude: 35.79142659549032, longitude: -5.926090783715026},
        {latitude: 35.80124656128414, longitude: -5.908434809253651}
      ]
    }
  ]
};

async function createZones() {
  try {

    for (const zoneData of data.zones) {
      // Create a new Zone document
      const zone = new Zone({
        name: zoneData.name,
        coordinates: zoneData.coordinates.map(coord => ({
          lat: coord.latitude,
          lng: coord.longitude
        }))
      });

      // Save the Zone document
      await zone.save();
      console.log(`Zone ${zone.name} created successfully.`);
    }

    console.log('All zones created successfully.');
  } catch (error) {
    console.error('Error creating zones:', error);
  }
}

module.exports = {createZones};