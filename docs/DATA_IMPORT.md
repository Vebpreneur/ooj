# OOJ: import av Sveriges kommuner

Kommunkatalogen kan fyllas från **Koladas öppna API v3**. Vi hämtar endast kommunnamn och kommunkoder – inga statistiska data.

Officiell dokumentation: https://api.kolada.se/v3/docs
Användarvillkor: https://www.kolada.se/om-oss/api/

## Kör i Codespaces

```bash
node --test tests/*.test.mjs
node scripts/import-municipalities.mjs
python3 -m http.server 8000
```

Därefter sparas `js/ooj-municipalities.js` med **290 kommuner**. Filen behöver **committas till GitHub** för att finnas kvar i repo och för andra utvecklare.

## Avsiktliga begränsningar

- Vi hittar **inte på kommunernas officiella URL:er**. De redan inlagda redaktionella kommunprofilerna behåller sina kända länkar; nytillkomna kommuner visas med namn och kommunkod samt tydlig upplysning om att webbplatsen inte är verifierad.
- Om Kolada inte svarar, ändrar format eller levererar färre än 290 kommuner avbryts importen utan att skriva över senast fungerande fil.
- Det här är en **förberedelse**, inte en påstådd färdig import. Första körningen behöver tillgång till nätverket.
- Om API:et blandar kommuner med regioner filtreras endast typ `K`.
- Källa: Kolada (RKA). OOJ är fristående, inte en officiell partner.

## Fortsatt arbete

Nästa separata datakälla ska vara ett officiellt myndighetsregister. Myndigheternas webbadresser måste kontrolleras innan vi visar direktlänkar. Inga nya UI-komponenter behövs för importen.
