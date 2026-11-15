/* Länskoder och länsnamn enligt SCB 2026.
 * Källa: https://www.scb.se/hitta-statistik/regional-statistik-och-kartor/regionala-indelningar/lan-och-kommuner/lan-och-kommuner-i-kodnummerordning/
 * Kommuner kopplas till län via de två första siffrorna i officiell kommunkod.
 * Geografiska relationer för övriga organisationer kräver explicit källa.
 */
window.OOJ_GEO = {
 counties: [
  {
    "code": "01",
    "name": "Stockholms län",
    "short": "Stockholm"
  },
  {
    "code": "03",
    "name": "Uppsala län",
    "short": "Uppsala"
  },
  {
    "code": "04",
    "name": "Södermanlands län",
    "short": "Södermanland"
  },
  {
    "code": "05",
    "name": "Östergötlands län",
    "short": "Östergötland"
  },
  {
    "code": "06",
    "name": "Jönköpings län",
    "short": "Jönköping"
  },
  {
    "code": "07",
    "name": "Kronobergs län",
    "short": "Kronoberg"
  },
  {
    "code": "08",
    "name": "Kalmar län",
    "short": "Kalmar"
  },
  {
    "code": "09",
    "name": "Gotlands län",
    "short": "Gotland"
  },
  {
    "code": "10",
    "name": "Blekinge län",
    "short": "Blekinge"
  },
  {
    "code": "12",
    "name": "Skåne län",
    "short": "Skåne"
  },
  {
    "code": "13",
    "name": "Hallands län",
    "short": "Halland"
  },
  {
    "code": "14",
    "name": "Västra Götalands län",
    "short": "Västra Götaland"
  },
  {
    "code": "17",
    "name": "Värmlands län",
    "short": "Värmland"
  },
  {
    "code": "18",
    "name": "Örebro län",
    "short": "Örebro"
  },
  {
    "code": "19",
    "name": "Västmanlands län",
    "short": "Västmanland"
  },
  {
    "code": "20",
    "name": "Dalarnas län",
    "short": "Dalarna"
  },
  {
    "code": "21",
    "name": "Gävleborgs län",
    "short": "Gävleborg"
  },
  {
    "code": "22",
    "name": "Västernorrlands län",
    "short": "Västernorrland"
  },
  {
    "code": "23",
    "name": "Jämtlands län",
    "short": "Jämtland"
  },
  {
    "code": "24",
    "name": "Västerbottens län",
    "short": "Västerbotten"
  },
  {
    "code": "25",
    "name": "Norrbottens län",
    "short": "Norrbotten"
  }
],
 initialMunicipalities: [],
 // Explicit koppling för redaktionellt urval: namn → länskod, inte national agency.
 curatedCountyCodes: {
  "Stockholms stad": "01",
  "Göteborgs Stad": "14",
  "Malmö stad": "12",
  "Uppsala kommun": "03",
  "Borlänge kommun": "20",
  "Västerås stad": "19",
  "Örebro kommun": "18",
  "Linköpings kommun": "05",
  "Lunds kommun": "12",
  "Helsingborgs stad": "12",
  "Norrköpings kommun": "05",
  "Umeå kommun": "24",
  "Region Stockholm": "01",
  "Region Skåne": "12",
  "Region Uppsala": "03",
  "Region Dalarna": "20",
  "Länsstyrelsen Stockholm": "01",
  "Länsstyrelsen Skåne": "12",
  "Länsstyrelsen Uppsala": "03"
}
};