# OOJ – första portalversionen

OOJ är en **fristående** svensk informationsportal. Vi börjar med OpenGovUI:s statiska version, som fungerar utan databas, WordPress eller API-nycklar. Den ursprungliga forkade koden och WordPress-temat finns kvar i repositoryts historik och under `wp-content/`.

## Fungerar i denna version
- Responsiv svensk portal med OOJ-identitet.
- Startsida, katalogsökning, kommuner, myndigheter, regioner, ämnesområden.
- Sökning, typfilter, paginering och dedikerade organisationsprofiler.
- Externa länkar till organisationernas egna webbsidor.
- En separat länk för att söka inom en organisations domän via Google (inte ett eget offentligt sökindex).

## Inte implementerat ännu
- Komplett import av samtliga 290 kommuner och Sveriges myndigheter.
- Automatiskt källverifierad dokument-/blankettsökning.
- AI-svar eller källbaserad RAG.
- Betalda API-tjänster, statistik eller personuppgiftshantering.

## Starta lokalt
Kör valfri statisk filserver i repositoryroten, t.ex. `python3 -m http.server 8000`, och öppna `http://localhost:8000`. Kan även deployas som en statisk webbplats utan byggsteg. Root `index.html` använder `css/ooj.css`, `js/ooj-data.js` och `js/ooj.js`.

## Data och rättelse
`js/ooj-data.js` innehåller **ett manuellt starturval**, inte ett nationellt register. Det är en grund för layout och funktionalitet och behöver granskas mot officiella källor innan publik lansering. Nästa steg är att importera och normalisera en officiell organisationslista och lagra verifierad webbplats per organisation. UI:t visar tydligt att OOJ inte är en myndighet.

## Teknik
Vanlig HTML/CSS/JavaScript utan framework och utan backend i denna fas. Målet är snabb visuell validering av OpenGovUI-layouten innan en eventuell Next.js-migrering. Visuell inspiration: Helsinki Design System, Designers Italia och 21stGov. Vi återanvänder inte officiella myndighetslogotyper eller deras identiteter.

## Kommunimport (förberedd)

Kör `node --test tests/*.test.mjs` och därefter `node scripts/import-municipalities.mjs` i Codespaces. Följ `docs/DATA_IMPORT.md`. Scriptet kräver nätverk, stoppar ofullständiga importer och gissar inga webbadresser.
