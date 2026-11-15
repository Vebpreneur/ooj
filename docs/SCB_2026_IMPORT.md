# Dataverifiering: Sveriges kommuner 2026

- **290 unika kommunkoder** i `js/ooj-municipalities.js`.
- **21 län** utifrån kommunkodens två första siffror.
- **Källa:** [SCB, län och kommuner i kodnummerordning 2026](https://www.scb.se/hitta-statistik/regional-statistik-och-kartor/regionala-indelningar/lan-och-kommuner/lan-och-kommuner-i-kodnummerordning/).
- Befintliga redaktionellt inlagda kommuner matchas mot SCB-koden så de inte dubbleras; deras befintliga URL:er bevaras.
- Övriga kommuner har för närvarande ingen verifierad officiell webbplats i katalogen. Vi hittar inte på webbadresser.
- Sökningen visar **50** träffar per sida (tidigare 12) med sidbläddring.
- Myndigheter och regioner är ännu inte rikstäckande. De får inte räknas som färdiga bara för att kommunförteckningen är komplett.

## OBS om importskript
`scripts/import-municipalities.mjs` är en separat Kolada-import för framtida uppdateringar. Den är inte samma sak som den SCB 2026-version som nu är incheckad och bör inte köras utan att granska diffen efteråt.
