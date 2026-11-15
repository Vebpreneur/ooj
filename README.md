# OOJ

**OOJ** är en fristående svensk sök- och informationsportal under utveckling. Projektet utgår från den öppna webbplatsmallen **OpenGovUI**, men har en egen svensk startsida, en första organisationskatalog och ett eget varumärke.

> OOJ är inte en svensk myndighet och har ingen officiell anslutning till de organisationer som listas.

## Visa projektet lokalt eller i GitHub Codespaces

Ingen deployment och inga API-nycklar behövs för att förhandsgranska den statiska versionen.

```bash
python3 -m http.server 8000
```

Öppna `http://localhost:8000` eller port **8000** via **Ports** i Codespaces.

### Vad fungerar idag?

- Svensk OOJ-startsida, responsiv navigation och ett första urval av organisationer.
- Katalogsökning efter namn och ansvarsområde, typfilter samt paginering.
- Organisationsprofiler med tydliga externa länkar där webbplatsen är känd.
- Ämnesområden med vägar vidare till relevanta organisationer.
- Förberedd kommunimport från Kolada API v3. Förrän importen körs är förteckningen **inte komplett**.

### Importera kommunförteckningen

Inga externa beroenden behöver installeras; Node.js 18+ rekommenderas.

```bash
node --test tests/*.test.mjs
node scripts/import-municipalities.mjs
```

Importskriptet kräver internetåtkomst. Vid giltigt svar genereras `js/ooj-municipalities.js` med namn och kommunkoder. **Kom ihåg att committa den genererade filen**, annars finns den bara i din utvecklingsmiljö. Källan anges som **Kolada (RKA)**.

För detaljer, se [dataimport](docs/DATA_IMPORT.md).

### Kommande utveckling

1. Importera alla 290 kommuner och verifiera deras officiella webbadresser separat.
2. Importera statliga myndigheter och regioner via officiella register.
3. Koppla sökresultaten till dokument, blanketter och e-tjänster hos ursprungskällorna.
4. Kontrollera och eventuellt integrera färdiga komponenter från Helsinki Design System med användarens godkännande.
5. Utvärdera AI-baserad, källbelagd frågesökning i ett senare skede.

Ingen statistikportal eller AI-funktion implementeras i denna fas.

### Teknik och struktur

| Sökväg | Innehåll |
|---|---|
| `index.html` | Svensk frontend |
| `css/ooj.css` | Nuvarande OOJ-stilar |
| `js/ooj.js` | Navigation, sökning och profilsidor |
| `js/ooj-data.js` | Manuellt starturval av organisationer |
| `js/ooj-municipalities.js` | Genererad kommunlista (tom tills importen körs) |
| `scripts/import-municipalities.mjs` | Import med validering |
| `tests/` | Tester för import och datavalidering |
| `OOJ_COMPONENT_AUDIT.md` | Inventering och komponentförslag som kräver godkännande |
| `wp-content/` | Kvarvarande WordPress-del från OpenGovUI |

### Temakällor

OpenGovUI av [pasan93](https://github.com/pasan93/opengovui) är grunden till forken och licensierat under MIT. Relevanta designreferenser är Helsinki Design System, Norges Designsystemet och Designers Italia – Comune. Dessa är **inte installerade i OOJ** och en sådan integration kräver separat beslut.

**OBS:** Den första OOJ-frontenden innehåller egen CSS skapad innan beslutet att prioritera temats befintliga komponenter. Den är bevarad tills ett godkänt komponentbyte görs.

### Ändringar och lagring

Allt arbete görs i GitHub-repot. **ShipStatic, Netlify och Vercel är inte källkodslagring för OOJ.** Förhandsvisningar kan användas separat men är aldrig den enda kopian av projektet.
