(function(){
"use strict";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fold=s=>String(s||"").toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const link=(url,text,css="text-link")=>'<a class="'+css+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(text)+' ↗</a>';
const card=l=>'<a class="org-result" href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer"><div class="org-avatar" aria-hidden="true">↗</div><div><h3>'+esc(l.title)+'</h3><p>'+esc(l.description)+' · '+esc(l.type)+'</p></div><span class="arrow" aria-hidden="true">↗</span></a>';
function render(o,db,shell){
const d=window.OOJ_BORLANGE,total=d.groups.reduce((n,g)=>n+g.links.length,0);
const nav=d.groups.map(g=>'<a class="chip" href="#/organisation/'+o.id+'?sektion='+g.id+'">'+esc(g.title)+'</a>').join("");
const categories=d.groups.map(g=>'<section class="panel" id="section-'+g.id+'"><div class="label">Välj en officiell väg vidare</div><h2>'+esc(g.title)+'</h2><p>'+esc(g.description)+'</p><div class="org-list">'+g.links.map(card).join("")+'</div></section>').join("");
const region=db.organizations.find(x=>x.name==="Region Dalarna");
const related='<div class="org-list"><a href="#/lan/20" class="org-result"><div class="org-avatar">20</div><div><h3>Dalarnas län</h3><p>Utforska kommuner och regionala verksamheter i länet.</p></div><span class="arrow">↗</span></a>'+(region?'<a href="#/organisation/'+region.id+'" class="org-result"><div class="org-avatar">RD</div><div><h3>Region Dalarna</h3><p>Regional hälso- och sjukvård och utveckling.</p></div><span class="arrow">↗</span></a>':'')+'</div>';
const main='<div class="profile-grid"><div>'
+'<section class="panel"><div class="label">Kommunkod 2081 · Dalarnas län</div><h2>Vad behöver du göra i Borlänge?</h2><p>Hitta rätt bland Borlänge kommuns ansökningar, e-tjänster, blanketter, offentliga handlingar och kontaktvägar.</p><p>'+link(d.portal,"Öppna alla kommunens e-tjänster","official-button")+'</p><div class="chips">'+nav+'</div><p class="note">Alla länkar leder vidare till Borlänge kommuns officiella sidor. OOJ är fristående och tar inte emot ansökningar.</p></section>'
+'<section class="panel"><div class="label">'+total+' källgranskade destinationer</div><h2>Sök en tjänst eller fråga</h2><div class="toolbar"><input type="search" id="borlange-search" aria-label="Sök bland Borlänges ärenden" placeholder="Exempel: bygglov, försörjningsstöd, protokoll…"></div><div class="result-count" id="borlange-count"></div><div class="org-list" id="borlange-results"></div></section>'
+categories+'<section class="panel"><h2>Relaterade organisationer</h2>'+related+'</section>'
+'</div><aside><section class="panel"><div class="label">Kommun</div><h2>Borlänge kommun</h2><div class="label">Län</div><div class="detail"><a class="text-link" href="#/lan/20">Dalarnas län ↗</a></div><div class="label">Kommunkod</div><div class="detail">2081</div><div class="label">Officiell webbplats</div><div class="detail">'+link(d.url,"borlange.se")+'</div></section>'
+'<section class="panel"><h2>Kontakta kommunen</h2><div class="label">Servicecenter</div><div class="detail"><a class="text-link" href="tel:+4624374000">'+esc(d.contact.phone)+'</a></div><div class="label">E-post</div><div class="detail"><a class="text-link" href="mailto:'+esc(d.contact.email)+'">'+esc(d.contact.email)+'</a></div><div class="label">Besöksadress</div><div class="detail">'+esc(d.contact.address)+'</div>'+link(d.contact.url,"Öppna kommunens kontaktsida","official-button")+'</section>'
+'<section class="panel"><h2>Källor och aktualitet</h2><p>Detta är en redaktionell sammanställning av direkta ingångar till Borlänge kommuns egna webbplatser.</p><p>'+link(d.url,"Officiell webbplats")+'</p><p>'+link(d.portal,"E-tjänstportal")+'</p><div class="label">Senast kontrollerad</div><div class="detail">17 november 2026</div><p class="note">Regler, avgifter, öppettider och tjänster kan ändras. Den officiella webbplatsen är alltid förstahandskälla.</p></section></aside></div>';
return shell("Borlänge kommun","En vägvisare till kommunal service, ansökningar, e-tjänster, offentliga handlingar och kontaktuppgifter.",'<a href="#/kommuner">Kommuner</a> / <a href="#/lan/20">Dalarnas län</a> / Borlänge',main);
}
function wire(){
const input=document.querySelector("#borlange-search"),result=document.querySelector("#borlange-results"),count=document.querySelector("#borlange-count");
if(!input||!result)return;
const links=window.OOJ_BORLANGE.groups.flatMap(g=>g.links);
const update=()=>{const q=fold(input.value.trim()),found=links.filter(l=>!q||fold([l.title,l.description,l.type].join(" ")).includes(q));count.textContent=found.length+" officiella sidor och tjänster";result.innerHTML=found.length?found.slice(0,25).map(card).join(""):'<div class="empty"><h3>Ingen träff</h3><p>Prova ett annat sökord eller öppna kommunens e-tjänstportal.</p></div>'};
input.addEventListener("input",update);update();
const section=new URLSearchParams(location.hash.split("?")[1]||"").get("sektion");
if(section)document.getElementById("section-"+section)?.scrollIntoView();
}
window.OOJ_BORLANGE_RENDER={render,wire};
})();