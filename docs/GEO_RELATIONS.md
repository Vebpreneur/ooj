# Geografiska relationer i OOJ

## Varför?
En användare kan söka efter **Dalarna**, besöka `#/lan/20` och se kommunerna och de regionala organisationerna som faktiskt har relation till länet. Relationerna fungerar även åt andra hållet: på en kommuns profil går det att gå vidare till länet. Detsamma gäller de länsanknutna offentliga organisationer vi uttryckligen kopplat.

## Datamodell
- **Län**: kod + namn + kortnamn från SCB:s länsindelning.
- **Kommun**: officiell fyrsiffrig kommunkod → länskod via de två första siffrorna.
- **Region och länsstyrelse**: explicit länskod, inte automatisk gissning utifrån namn.
- **Riksmyndigheter**: lämnas utan länskod så att de inte felaktigt visas som enbart lokala.

Källa: https://www.scb.se/hitta-statistik/regional-statistik-och-kartor/regionala-indelningar/lan-och-kommuner/lan-och-kommuner-i-kodnummerordning/

## Fungerar nu
- 21 län i `#/lan`.
- Dedikerad länssida, exempel `#/lan/20` (Dalarnas län).
- Tillbakalänkar från organisationsprofiler till län.
- Sökning på länsnamn och filtrering efter län i katalogen.
- 15 Dalarnas kommuner som verifierad startuppsättning enligt SCB 2026. Dessa poster har namn och kod men inga påhittade webbplatslänkar.
- Befintliga verifierade kommunprofiler får behålla sina webbadresser.

## Import senare
`js/ooj-geography.js` innehåller relationsstrukturen och en begränsad startuppsättning. När `node scripts/import-municipalities.mjs` körs ersätter den importerade listan startuppsättningen på 15 kommuner. När den genererade filen committats kommer alla 290 kommuner kunna kopplas till rätt län via koden.

## Avgränsningar
Relationer betyder inte att en myndighet har ett lokalkontor i länet. Regionala relationer ska vara verifierade. AI och statistik är inte inblandade. Inga nya UI-bibliotek, CSS-komponenter eller deployments har lagts till.
