/* Initial editorial directory only. It is NOT a complete official register.
Each item links to a known government or municipality homepage.
Verify source URLs during the registry import before launch. */
window.OOJ_DATA={
  organizations:[
    ["Skatteverket","myndighet","Skatt, folkbokföring och personnummer","https://www.skatteverket.se","skatt,flytt,folkbokföring,deklaration"],
    ["Försäkringskassan","myndighet","Socialförsäkring, föräldrapenning och ersättningar","https://www.forsakringskassan.se","föräldrapenning,sjukpenning,bidrag"],
    ["Polismyndigheten","myndighet","Pass, nationellt id-kort och polisanmälan","https://polisen.se","pass,polis,brott,id-kort"],
    ["Arbetsförmedlingen","myndighet","Arbete, arbetslöshet och stöd vid jobbsökande","https://arbetsformedlingen.se","jobb,arbete,anställning"],
    ["Transportstyrelsen","myndighet","Körkort, fordon, vägtrafik och transporter","https://www.transportstyrelsen.se","bil,körkort,fordon"],
    ["Migrationsverket","myndighet","Uppehållstillstånd, medborgarskap och migration","https://www.migrationsverket.se","uppehållstillstånd,visum,medborgarskap"],
    ["Pensionsmyndigheten","myndighet","Allmän pension och pensionsrelaterade frågor","https://www.pensionsmyndigheten.se","pension,pensionär"],
    ["Bolagsverket","myndighet","Företagsregistrering och företagsinformation","https://bolagsverket.se","företag,registrera,aktiebolag"],
    ["Kronofogden","myndighet","Skulder, betalningsförelägganden och verkställighet","https://kronofogden.se","skuld,betalning,utmätning"],
    ["Lantmäteriet","myndighet","Fastigheter, kartor och fastighetsregister","https://www.lantmateriet.se","fastighet,tomt,karta"],
    ["Socialstyrelsen","myndighet","Kunskapsstöd och regler inom vård och omsorg","https://www.socialstyrelsen.se","vård,omsorg,hälsa"],
    ["Livsmedelsverket","myndighet","Livsmedelssäkerhet, råd och kontroll","https://www.livsmedelsverket.se","mat,livsmedel,restaurang"],
    ["Konsumentverket","myndighet","Konsumenträtt och konsumentinformation","https://www.konsumentverket.se","konsument,köp,reklamation"],
    ["CSN","myndighet","Studiemedel, studiestöd och studielån","https://www.csn.se","studier,studielån,studiemedel"],
    ["Naturvårdsverket","myndighet","Miljö, natur och miljöarbete","https://www.naturvardsverket.se","natur,miljö"],
    ["Länsstyrelsen Stockholm","myndighet","Statlig regional förvaltning i Stockholms län","https://www.lansstyrelsen.se/stockholm.html","länsstyrelsen,stockholm"],
    ["Länsstyrelsen Skåne","myndighet","Statlig regional förvaltning i Skåne län","https://www.lansstyrelsen.se/skane.html","länsstyrelsen,skåne"],
    ["Länsstyrelsen Uppsala","myndighet","Statlig regional förvaltning i Uppsala län","https://www.lansstyrelsen.se/uppsala.html","länsstyrelsen,uppsala"],
    ["Stockholms stad","kommun","Kommunal service och e-tjänster i Stockholm","https://start.stockholm","stockholm,bygglov,skola"],
    ["Göteborgs Stad","kommun","Kommunal service och e-tjänster i Göteborg","https://goteborg.se","göteborg,bygglov,skola"],
    ["Malmö stad","kommun","Kommunal service och e-tjänster i Malmö","https://malmo.se","malmö,bygglov,skola"],
    ["Uppsala kommun","kommun","Kommunal service och e-tjänster i Uppsala","https://www.uppsala.se","uppsala,bygglov,skola"],
    ["Borlänge kommun","kommun","Kommunal service och e-tjänster i Borlänge","https://www.borlange.se","borlänge,bygglov,skola"],
    ["Västerås stad","kommun","Kommunal service och e-tjänster i Västerås","https://www.vasteras.se","västerås,bygglov,skola"],
    ["Örebro kommun","kommun","Kommunal service och e-tjänster i Örebro","https://www.orebro.se","örebro,bygglov,skola"],
    ["Linköpings kommun","kommun","Kommunal service och e-tjänster i Linköping","https://www.linkoping.se","linköping,bygglov,skola"],
    ["Lunds kommun","kommun","Kommunal service och e-tjänster i Lund","https://lund.se","lund,bygglov,skola"],
    ["Helsingborgs stad","kommun","Kommunal service och e-tjänster i Helsingborg","https://helsingborg.se","helsingborg,bygglov,skola"],
    ["Norrköpings kommun","kommun","Kommunal service och e-tjänster i Norrköping","https://www.norrkoping.se","norrköping,bygglov,skola"],
    ["Umeå kommun","kommun","Kommunal service och e-tjänster i Umeå","https://www.umea.se","umeå,bygglov,skola"],
    ["Region Stockholm","region","Regional hälso- och sjukvård samt kollektivtrafik","https://www.regionstockholm.se","stockholm,region,vård"],
    ["Region Skåne","region","Regional hälso- och sjukvård och utveckling","https://www.skane.se","skåne,region,vård"],
    ["Region Uppsala","region","Regional hälso- och sjukvård och utveckling","https://regionuppsala.se","uppsala,region,vård"],
    ["Region Dalarna","region","Regional hälso- och sjukvård och utveckling","https://www.regiondalarna.se","dalarna,region,vård"]
  ].map((a,i)=>({id:i+1,name:a[0],type:a[1],description:a[2],url:a[3],tags:a[4].split(",")})),
  topics:[
    {slug:"familj",title:"Familj och barn",icon:"♡",description:"Föräldraskap, barn, förskola och familjerelaterade frågor.",terms:"föräldrapenning,skola,barn",links:[1,2]},
    {slug:"arbete",title:"Arbete och företag",icon:"▣",description:"Arbete, företagande, registrering och ersättningar.",terms:"jobb,företag,skatt",links:[0,3,7]},
    {slug:"boende",title:"Boende och byggande",icon:"⌂",description:"Flytt, folkbokföring, fastigheter och kommunala ärenden.",terms:"flytt,bygglov,fastighet",links:[0,9,18]},
    {slug:"trafik",title:"Resor och trafik",icon:"↗",description:"Pass, körkort, fordon och resor.",terms:"pass,körkort,fordon",links:[2,4]},
    {slug:"studier",title:"Utbildning och studier",icon:"▤",description:"Studier, studiestöd och skolfrågor.",terms:"csn,skola,studier",links:[13,19]},
    {slug:"halsa",title:"Hälsa och omsorg",icon:"+",description:"Hälso- och sjukvård samt social omsorg.",terms:"vård,omsorg,hälsa",links:[10,30]},
    {slug:"juridik",title:"Rättigheter och juridik",icon:"§",description:"Skulder, konsumenträtt och rättsliga frågor.",terms:"skuld,konsument,polis",links:[8,12]},
    {slug:"miljo",title:"Miljö och natur",icon:"◈",description:"Miljö, naturvård och livsmedelsfrågor.",terms:"natur,miljö,mat",links:[11,14]}
  ]
};