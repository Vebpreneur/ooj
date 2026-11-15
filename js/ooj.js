(function(){
"use strict";
const db=window.OOJ_DATA||{organizations:[],topics:[]},app=document.getElementById("app");
// Nationella kommunnamn och kommunkoder laddas från en separat genererad fil.
// Befintliga redaktionella poster behåller sina kända URL:er; övriga saknar URL
// tills länkarna granskats. Gissa aldrig fram en officiell webbplats.
const geo=window.OOJ_GEO||{counties:[],initialMunicipalities:[],curatedCountyCodes:{}};
const countyByCode=new Map(geo.counties.map(c=>[c.code,c]));
// Seed-katalogen är verifierad mot SCB för Dalarna, övriga län importeras senare.
const imported=Array.isArray(window.OOJ_MUNICIPALITIES)&&window.OOJ_MUNICIPALITIES.length
  ?window.OOJ_MUNICIPALITIES : geo.initialMunicipalities;

const municipalityKey=name=>String(name).toLocaleLowerCase("sv-SE")
  .replace(/\s+(?:kommun|stad)$/,"").replace(/s$/,"");
const municipalityNames=new Set(db.organizations.filter(o=>o.type==="kommun").map(o=>municipalityKey(o.name)));
const newMunicipalities=imported
  .filter(x=>x&&/^\d{4}$/.test(x.code)&&typeof x.name==="string"&&!municipalityNames.has(municipalityKey(x.name)))
  .map(x=>({id:"K-"+x.code,code:x.code,name:x.name,type:"kommun",description:"Kommun i Sverige",url:null,tags:[]}));
db.organizations.push(...newMunicipalities);
db.organizations.forEach(o=>{
  o.countyCode=(o.code&&/^\d{4}$/.test(o.code)?o.code.slice(0,2):geo.curatedCountyCodes[o.name])||null;
  // Riksmyndigheter får inte automatiskt länskoppling från sitt huvudkontor.
});
const $=(s,root=document)=>root.querySelector(s);
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fold=s=>String(s??"").toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const href=o=>"#/organisation/"+o.id;
const countyHref=code=>"#/lan/"+code;
const countyName=code=>countyByCode.get(code)?.name||null;
const countyAliases=code=>{const c=countyByCode.get(code);return c?[c.name,c.short,"län","lan"].join(" "):""};

const kinds={myndighet:"Statlig myndighet",kommun:"Kommun",region:"Region"};
const state={q:"",type:"alla",page:1};
const topicCard=t=>'<a class="card topic-card" href="#/amne/'+encodeURIComponent(t.slug)+'"><div class="card-icon">'+escape(t.icon)+'</div><h3>'+escape(t.title)+'</h3><p>'+escape(t.description)+'</p></a>';
const orgCard=o=>'<a class="org-result" href="'+href(o)+'"><div class="org-avatar" aria-hidden="true">'+escape(o.name.slice(0,2).toUpperCase())+'</div><div><h3>'+escape(o.name)+'</h3><p>'+escape(kinds[o.type])+' · '+escape(o.description)+(o.countyCode?' · '+escape(countyName(o.countyCode)):'')+'</p></div><span class="arrow" aria-hidden="true">↗</span></a>';
function shell(title,description,crumbs,body){return '<section class="page-top"><div class="container page-heading"><div class="breadcrumbs"><a href="#/">Start</a> <span aria-hidden="true">/</span> '+crumbs+'</div><h1>'+escape(title)+'</h1><p>'+escape(description)+'</p></div></section><div class="container content-area">'+body+'</div>'}
function home(){
return '<section class="hero"><div class="container"><div class="hero-inner"><span class="eyebrow">En enklare väg genom offentlig information</span><h1>Hela Sveriges offentliga sektor. Ett ställe.</h1><p class="hero-lead">Hitta kommuner, myndigheter och offentliga organisationer. Sök i vår katalog och ta dig vidare till deras officiella webbplatser.</p><form class="search-shell" id="home-search" role="search"><span class="mag" aria-hidden="true">⌕</span><input id="home-q" type="search" placeholder="Sök kommun, myndighet eller ämne…" aria-label="Sök i OOJ" required><button type="submit">Sök i OOJ ↗</button></form><div class="hero-meta"><span class="pill">Fristående portal</span><span>Officiella länkar · Svenska organisationer · Ingen inloggning</span></div></div></div></section>'
+'<section class="section white"><div class="container"><div class="section-head"><div><span class="eyebrow" style="color:var(--blue)">Utforska OOJ</span><h2>Hitta rätt organisation.</h2><p>Välj var du vill börja. Varje organisation får en egen sida med en väg till originalkällan.</p></div></div><div class="card-grid"><a class="card" href="#/kommuner"><div class="card-icon">⌂</div><h3>Kommuner</h3><p>Hitta kommunal service, information och officiella webbplatser.</p></a><a class="card" href="#/myndigheter"><div class="card-icon">▤</div><h3>Myndigheter</h3><p>Hitta nationella myndigheter, ansvarsområden och kontaktvägar.</p></a><a class="card" href="#/regioner"><div class="card-icon">✚</div><h3>Regioner</h3><p>Utforska regionala organisationer och deras webbplatser.</p></a></div></div></section>'
+'<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow" style="color:var(--blue)">Vanliga områden</span><h2>Vad behöver du hjälp med?</h2><p>Vi hjälper dig att hitta vilken offentlig aktör som kan vara relevant.</p></div><a class="text-link" href="#/lan">Utforska Sveriges län ↗</a></div><div class="topic-grid">'+db.topics.map(topicCard).join("")+'</div></div></section>'
+'<section class="feature-band"><div class="container band-grid"><div><span class="eyebrow" style="color:#bac7ff">Hitta källan</span><h2>Rätt information finns ofta redan.</h2><p>OOJ ska göra det enklare att hitta den. Vi visar vägen till ansvariga organisationer, och du går vidare direkt till deras officiella webbplatser.</p></div><div class="band-links"><a href="#/sok">Sök i organisationskatalogen <span>↗</span></a><a href="#/myndigheter">Utforska myndigheter <span>↗</span></a><a href="#/om">Så fungerar OOJ <span>↗</span></a></div></div></section>'
+'<section class="section white"><div class="container"><div class="section-head"><div><h2>Utvalda organisationer.</h2><p>Ett första urval. En komplett import från officiella register är nästa steg.</p></div><a class="text-link" href="#/sok">Visa katalogen ↗</a></div><div class="org-list">'+[0,1,2,18].map(i=>db.organizations[i]).filter(Boolean).map(orgCard).join("")+'</div></div></section>'}
function countyCard(c){
const n=db.organizations.filter(o=>o.type==="kommun"&&o.countyCode===c.code).length;
return '<a href="'+countyHref(c.code)+'" class="card topic-card"><div class="card-icon">⌂</div><h3>'+escape(c.name)+'</h3><p>'+n+' kommuner i katalogen · Utforska länet ↗</p></a>';
}
function countiesPage(){
return shell("Sveriges län","Utforska Sveriges 21 län. Varje län visar registrerade kommuner och relevanta regionala organisationer.","Län",
'<div class="topic-grid">'+geo.counties.map(countyCard).join("")+'</div><p class="note" style="margin-top:24px">Länsindelningen kommer från SCB. Kommunregistret byggs ut, så vissa län kan ännu sakna kommuner i OOJ.</p>');
}
function countyPage(code){
const c=countyByCode.get(code);if(!c)return notFound();
const members=db.organizations.filter(o=>o.countyCode===code);
const municipalities=members.filter(o=>o.type==="kommun").sort((a,b)=>a.name.localeCompare(b.name,"sv"));
const regional=members.filter(o=>o.type!=="kommun");
return shell(c.name,"Kommuner och regionala offentliga organisationer med verifierad koppling till "+c.name+".",
'<a href="#/lan">Län</a> / '+escape(c.name),
'<div class="panel"><h2>Kommuner i '+escape(c.short)+'</h2><p>'+municipalities.length+' kommuner finns för närvarande i OOJ för detta län. Namn och kommunkoder hämtas från officiell regional indelning.</p></div><div class="org-list">'+(municipalities.length?municipalities.map(orgCard).join(""):'<div class="empty"><h3>Kommuner importeras</h3><p>Det finns ännu inga registrerade kommuner för länet i denna version.</p></div>')+'</div>'
+(regional.length?'<div class="panel" style="margin-top:30px"><h2>Regionala offentliga organisationer</h2><p>Organisationer som hittills kopplats till länet.</p></div><div class="org-list">'+regional.map(orgCard).join("")+'</div>':'')
+'<p class="note" style="margin-top:24px">Statliga myndigheter med nationellt ansvarsområde listas inte automatiskt som lokala länsorganisationer. Relationer läggs till först när de är verifierade.</p>');
}
function orgDirectory(type="alla"){
const names={alla:["Sök i OOJ","Sök bland de organisationer som hittills lagts in i katalogen."],kommun:["Kommuner","Hitta svenska kommuner och gå vidare till deras officiella webbplatser."],myndighet:["Myndigheter","Sök bland statliga myndigheter och andra hittills registrerade offentliga aktörer."],region:["Regioner","Utforska regioner och deras officiella webbplatser."]};
const n=names[type],label=type==="alla"?"Sök":type==="kommun"?"Kommuner":type==="myndighet"?"Myndigheter":"Regioner";
return shell(n[0],n[1],escape(label),'<div class="toolbar"><input id="dir-search" type="search" placeholder="Sök namn, ort eller ansvarsområde…" aria-label="Sök organisationer" value="'+escape(state.q)+'"><select id="dir-type" aria-label="Filtrera typ"><option value="alla">Alla organisationer</option><option value="kommun">Kommuner</option><option value="myndighet">Myndigheter</option><option value="region">Regioner</option></select><select id="dir-county" aria-label="Filtrera län"><option value="">Alla län</option>'+geo.counties.map(c=>'<option value="'+escape(c.code)+'">'+escape(c.name)+'</option>').join("")+'</select></div><div class="result-count" id="count" aria-live="polite"></div><div class="org-list" id="results"></div><div class="pagination" id="pager"></div><p class="note" style="margin-top:27px">Kommunuppgifter kan importeras från Kolada. Webbplatser visas först när de har verifierats. Myndighets- och regionregistret är ännu inte komplett.</p>');
}
function profile(id){
const o=db.organizations.find(x=>String(x.id)===String(id));
if(!o)return notFound();
const domain=o.url?new URL(o.url).hostname:null;
const subject=o.type==="kommun"?"Kommuner":o.type==="region"?"Regioner":"Myndigheter",subjectLink=o.type==="kommun"?"kommuner":o.type==="region"?"regioner":"myndigheter";
const searchURL=o.url?"https://www.google.com/search?q="+encodeURIComponent("site:"+domain+" "):null;
const countyRelation=o.countyCode&&countyByCode.has(o.countyCode)?'<div class="label">Län</div><div class="detail"><a class="text-link" href="'+countyHref(o.countyCode)+'">'+escape(countyName(o.countyCode))+' ↗</a></div>':'';
return shell(o.name,o.description,'<a href="#/'+subjectLink+'">'+subject+'</a> / '+escape(o.name),
'<div class="profile-grid"><div><div class="panel"><div class="label">Om organisationen</div><h2>'+escape(o.name)+'</h2><p>'+escape(o.description)+'. Hos organisationen hittar du aktuell och detaljerad information, kontaktuppgifter och eventuella e-tjänster.</p>'+(o.url?'<a class="official-button" href="'+escape(o.url)+'" target="_blank" rel="noopener noreferrer">Besök officiell webbplats ↗</a>':'<p class="note">Officiell webbplats är ännu inte verifierad. Vi visar därför ingen gissad länk.</p>')+'</div><div class="panel"><h2>Hitta information hos '+escape(o.name)+'</h2>'+(o.url?'<p>Behöver du en blankett eller en specifik tjänst? Använd webbplatsens egna sökfunktion eller sök på organisationens domän.</p><a class="text-link" href="'+escape(searchURL)+'" target="_blank" rel="noopener noreferrer">Sök på '+escape(domain)+' via extern sökmotor ↗</a><p class="note">Extern sökning öppnas hos Google och kan även visa annat än officiellt innehåll. OOJ kontrollerar ännu inte träffarna i den externa sökningen.</p>':'<p>Vi kompletterar organisationsprofilen när webbplatsen verifierats mot en officiell källa.</p>')+'</div></div><aside><div class="panel"><div class="label">Organisationstyp</div><div class="detail">'+escape(kinds[o.type])+'</div>'+(o.code?'<div class="label">Kommunkod</div><div class="detail">'+escape(o.code)+'</div>':'')+countyRelation+'<div class="label">Officiell webbplats</div><div class="detail">'+(o.url?'<a class="text-link" href="'+escape(o.url)+'" target="_blank" rel="noopener noreferrer">'+escape(domain)+' ↗</a>':'Ännu inte verifierad')+'</div><div class="label">Profilstatus</div><div class="detail">'+(o.code?'Kommunuppgift från Kolada':'Första katalogversionen')+'</div><div class="note">OOJ är en fristående informationsportal. Kontrollera alltid aktuell information hos organisationen.</div></div></aside></div>');
}
function topics(){return shell("Ämnesområden","Utforska vanliga frågor och hitta organisationer som kan vara relevanta för ditt ärende.","Ämnesområden",'<div class="topic-grid">'+db.topics.map(topicCard).join("")+'</div>')}
function topicPage(slug){
const t=db.topics.find(x=>x.slug===slug);if(!t)return notFound();
const orgs=t.links.map(i=>db.organizations[i]).filter(Boolean);
return shell(t.title,t.description,'<a href="#/amnen">Ämnesområden</a> / '+escape(t.title),'<div class="panel"><h2>Vart vänder jag mig?</h2><p>Här är ett första urval av offentliga organisationer som kan vara relevanta för detta ämne. Öppna organisationens profilsida för att besöka dess officiella webbplats.</p></div><div class="org-list">'+orgs.map(orgCard).join("")+'</div><p class="note" style="margin-top:22px">Detta är vägvisning, inte en fullständig förteckning över tjänster eller individuella myndighetsråd.</p>')}
function about(){return shell("Om OOJ","Vi gör det lättare att orientera sig bland Sveriges offentliga organisationer.","Om OOJ",'<div class="profile-grid"><div class="panel"><h2>En gemensam ingång</h2><p>OOJ är en fristående digital katalog under utveckling. Målet är att samla Sveriges kommuner, myndigheter, regioner och andra offentliga organisationer i ett tydligt och sökbart gränssnitt.</p><h2>Officiella källor först</h2><p>Vi visar vägvisande information och länkar vidare till respektive organisations webbplats. Officiella sidor är alltid förstahandskälla för blanketter, tjänster och gällande information.</p><h2>Vad fungerar nu?</h2><p>Startsida, ämneskategorier, sökning i vårt första organisationsurval samt profilsidor med direktlänkar. Heltäckande organisationsregister, extern webbsökning och AI-svar ingår ännu inte.</p></div><aside class="panel"><h2>Viktigt att veta</h2><p>OOJ är inte en svensk myndighet och är inte en officiell myndighetsportal. Vi hanterar inte ärenden, tar inte emot ansökningar och fattar inga myndighetsbeslut.</p></aside></div>')}
function notFound(){return shell("Sidan hittades inte","Adressen verkar inte stämma.","Inte hittad",'<div class="empty"><h3>Här fanns inget innehåll.</h3><a class="text-link" href="#/">Till startsidan ↗</a></div>')}
function renderResults(){
const input=$("#dir-search"),select=$("#dir-type");if(!input)return;
const q=fold(input.value.trim()),type=select.value;
const parts=q.split(/\s+/).filter(Boolean);
const county=$("#dir-county").value;
let matches=db.organizations.filter(o=>(type==="alla"||o.type===type)&&(!county||o.countyCode===county)&&(!parts.length||parts.every(part=>fold([o.name,o.description,o.type,...o.tags,countyAliases(o.countyCode)].join(" ")).includes(part))));
matches.sort((a,b)=>a.name.localeCompare(b.name,"sv"));
const limit=12,total=Math.max(1,Math.ceil(matches.length/limit));state.page=Math.min(state.page,total);
$("#count").textContent=matches.length+" organisationer i katalogen";
$("#results").innerHTML=matches.length?matches.slice((state.page-1)*limit,state.page*limit).map(orgCard).join(""):'<div class="empty"><h3>Inga träffar i katalogen</h3><p>Prova ett annat namn eller ämne. Vi har ännu inte importerat hela det svenska organisationsregistret.</p></div>';
$("#pager").innerHTML=matches.length>limit?'<button type="button" id="prev" '+(state.page===1?"disabled":"")+'>← Föregående</button><span>Sida '+state.page+' av '+total+'</span><button type="button" id="next" '+(state.page===total?"disabled":"")+'>Nästa →</button>':"";
$("#prev")?.addEventListener("click",()=>{state.page--;renderResults();$("#results")?.scrollIntoView({block:"start"})});
$("#next")?.addEventListener("click",()=>{state.page++;renderResults();$("#results")?.scrollIntoView({block:"start"})});
}
function navigate(){
const full=decodeURIComponent(location.hash.replace(/^#\/?/,"")||"");const [route,arg]=full.split("/");
const directoryType=route==="kommuner"?"kommun":route==="myndigheter"?"myndighet":route==="regioner"?"region":"alla";
app.innerHTML=route==="organisation"?profile(arg):route==="kommuner"||route==="myndigheter"||route==="regioner"||route==="sok"?orgDirectory(directoryType):route==="amnen"?topics():route==="amne"?topicPage(arg):route==="lan"?(arg?countyPage(arg):countiesPage()):route==="om"?about():route?notFound():home();
document.title=(route?({kommuner:"Kommuner",myndigheter:"Myndigheter",regioner:"Regioner",sok:"Sök",amnen:"Ämnesområden",lan:"Län",organisation:"Organisation",amne:"Ämne",om:"Om OOJ"}[route]||"OOJ")+" | OOJ":"OOJ – Hitta rätt i Sveriges offentliga sektor");
document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===route));
$("#home-search")?.addEventListener("submit",e=>{e.preventDefault();state.q=$("#home-q").value.trim();state.type="alla";state.page=1;location.hash="/sok"});
const dir=$("#dir-search"),select=$("#dir-type"),county=$("#dir-county");
if(dir){dir.value=state.q;select.value=route==="sok"?state.type:directoryType;renderResults();dir.addEventListener("input",()=>{state.q=dir.value;state.page=1;renderResults()});select.addEventListener("change",()=>{state.type=select.value;state.page=1;renderResults()});county.addEventListener("change",()=>{state.page=1;renderResults()})}
const mobile=$("#mobile-nav");if(mobile){mobile.hidden=true;$("#menu-toggle")?.setAttribute("aria-expanded","false")}
window.scrollTo({top:0,behavior:"instant"});
}
$("#menu-toggle")?.addEventListener("click",e=>{const nav=$("#mobile-nav");const show=nav.hidden;nav.hidden=!show;e.currentTarget.setAttribute("aria-expanded",String(show))});
window.addEventListener("hashchange",navigate);navigate();
})();