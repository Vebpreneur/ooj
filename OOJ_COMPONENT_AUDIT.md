# OOJ – komponentinventering och beslutspunkt

Status: granskad 2026-11-15. **Ingen extern komponentinstallation eller visuell ombyggnad är godkänd ännu.**

## Grundprincip

OpenGovUI är det forkade temat. Återanvänd dess befintliga HTML/CSS/JS först. OOJ har en separat statisk prototyp i `index.html`, `css/ooj.css`, `js/ooj.js` och `js/ooj-data.js`. Den prototypen skapades före detta komponentbeslut och innehåller egna stilar. Den ska inte vidareutvecklas med fler egna UI-komponenter innan användaren har granskat förslaget.

## Vad finns faktiskt i OpenGovUI?

Källa: befintliga `index.html` och `css/styles.css` i detta repository.

| Temadel | Befintliga CSS-klasser | Avsedd användning i OOJ |
| --- | --- | --- |
| Header och primär navigation | `.gov-header`, `.main-header`, `.header-content`, `.logo` | Logotyp, huvudmeny, mobillayout |
| Sökfält | `.header-search`, `.search-wrapper`, `.search-suggestions` | Sök i katalogen |
| Hero/startsida | `.hero`, `.hero-title`, `.hero-subtitle` | OOJ:s centrala ingång |
| Tjänster och vägval | `.featured-services`, `.services-grid`, `.service-card`, `.service-icon` | Genvägar till organisationstyper och ämnen |
| Ämneskategorier | `.topics-section`, `.topics-grid`, `.topic-card` | Ämnesområden |
| Publicerat innehåll | `.updates-section`, `.updates-grid`, `.update-card` | Framtida guider/uppdateringar – inte tomma demokort |
| Footer | `.gov-footer`, `.footer-section` | Navigering, upplysning om fristående tjänst |
| Tillgänglighet | `.skip-to-main` | Hoppa till innehållet |

OBS: OpenGovUI:s statiska original innehåller endast startsidan. Det finns **inga färdiga svenska organisationsprofiler, katalogfilter, indexsidor eller separata kommunmallar** i den statiska versionen. WordPress-versionen har däremot egna innehållstyper för tjänster, kategorier och uppdateringar; detta är inte samma sak som ett färdigt kommunregister.

## Externa designbibliotek – endast kandidater, ej installerade

### Helsinki Design System (HDS)
Officiell komponentlista: https://hds.hel.fi/components/

Färdiga relevanta byggdelar:
- `Header` och `Footer` – gemensam navigation.
- `Hero` – startsidans introduktion.
- `Card` och `Linkbox` – organisationer/ämnen.
- `Breadcrumb` – undersidor.
- `Search` (React) – sökförslag, historik, tangentbordsnavigation.
- `SearchInput` (Core CSS) – sökfält om vi stannar i statisk HTML.
- `Pagination`, `Tag`, `SideNavigation`, `Table` – sökresultat och längre innehåll.

HDS:s React-bibliotek kan inte installeras direkt i befintlig statisk HTML utan React-infrastruktur. `SearchInput` Core CSS är därför mer realistisk att pröva först, om den godkänns. Stadslogotyp och egna identitetsmönster ska inte användas som OOJ-symboler.

### Norges Designsystemet
Officiell dokumentation: https://designsystemet.no/

Relevanta resurser:
- Theme Builder och design tokens för konsekventa färg-, typografi- och spacingvärden.
- Dokumenterade navigations-, formulär- och tabellmönster.
- React/CSS-komponenter, men bör **inte** blandas direkt med hela HDS-komponentpaketet.

## Föreslagen riktning (kräver godkännande)

1. **Återgå visuellt till verkliga OpenGovUI-komponenter** för header, hero, tjänstekort, ämneskort och footer, med OOJ:s svenska text och egna färgvariabler.
2. **Välj HDS framför Norge för eventuella kompletterande komponenter**, särskilt Breadcrumb, Pagination och SearchInput. Gör en separat liten kompatibilitetskontroll först.
3. **Använd norska Designsystemets Theme Builder som referens**, inte en andra komponentstack.
4. Behåll funktionalitet för organisationsprofiler och katalogsökning, men besluta före varje ny visuell komponent om OpenGovUI eller ett godkänt externt bibliotek ska användas.

## Leveransregler

- Användaren ska få veta **vilken komponent**, **från vilket bibliotek**, **varför** och **vilken teknisk ändring det kräver** innan vi lägger till ny UI.
- Ingen Vercel/Netlify-deployment. Kontrollera via lokal filserver eller Codespaces.
- Ingen AI-sökning, statistikportal eller extra komplexitet i denna fas.
- Om en komponent inte finns färdig, be om godkännande innan en ny design byggs.

## Status just nu

Denna inventering är dokumentation och ändrar **inte** visuella komponenter i OOJ. Den tidigare prototypens egen CSS ligger kvar orörd tills användaren beslutar om återgång till OpenGovUI-styling eller godkända HDS-komponenter.
