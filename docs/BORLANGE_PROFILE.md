# Borlänge – innehållsrik referensprofil

OOJ har en redaktionellt källgranskad referensprofil för Borlänge kommun (kommunkod **2081**) med **27** direkta destinationslänkar inom **7** ämnesområden.

## Sidor
- Lokal sökning bland tjänster, ärenden, kommunala dokument och informationssidor.
- Länk till kommunens fullständiga e-tjänstportal.
- Förskola och skola, bygglov, omsorg, stöd, företag, kultur, offentliga handlingar, felanmälan.
- Kontaktuppgifter och geografiska relationer till Dalarnas län och Region Dalarna.
- Återanvänder befintliga OOJ-komponenter (panel, org-list, toolbar, chips) utan någon ny CSS eller installerat UI-bibliotek.

## Källor
Uppgifterna och URL:erna kommer från offentliga sidor hos Borlänge kommun och dess e-tjänstportal, kontrollerade **17 november 2026**:
- https://www.borlange.se/
- https://minasidor.borlange.se/
- https://www.borlange.se/bygglov
- https://www.borlange.se/barn-och-utbildning
- https://www.borlange.se/omsorg-och-hjalp
- https://www.borlange.se/jobb-och-foretagande
- https://www.borlange.se/kommun-och-politik/moten-handlingar-och-protokoll

Alla enskilda källor finns direkt i `js/ooj-borlange-data.js`. Kontrollera destinationer regelbundet: att en URL är publicerad idag garanterar inte att den fortsätter fungera.

## Testa
Kör `git pull origin main`, starta `python3 -m http.server 8000` och sök på **Borlänge** under Kommuner. URL:en är `#/organisation/23` i det ursprungliga datamaterialet; det kan ändras om organisationernas id-modell byts.

Ingen deployment har gjorts. Inga personuppgifter lagras.
