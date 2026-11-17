(function(){
"use strict";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fold=s=>String(s||"").toLocaleLowerCase("sv-SE").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const link=(url,text,klass="text-link")=>'<a class="'+klass+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(text)+' ↗</a>';
const item=l=>'<a class="org-result" href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer"><div class="org-avatar" aria-hidden="true">↗</div><div><h3>'+esc(l.title)+'</h3><p>'+esc(l.description)+'</p></div><span class="arrow" aria-hidden="true">↗</span></a>';
function render(o,catalog,shell){
const organizations=catalog.organizations;
const d=window.OOJ_BORLANGE;
const categories=d.groups.map(g=>'<details class="panel municipality-topic" id="topic-'+esc(g.id)+'"><summary><span class="topic-heading"><span class="label">'+g.links.length+' tjänster och informationssidor</span><strong>'+esc(g.title)+'</strong><span class="topic-description">'+esc(g.description)+'</span></span><span class="topic-toggle" aria-hidden="true">+</span></summary><div class="org-list">'+g.links.map(item).join("")+'</div></details>').join("");
const region=organizations.find(x=>x.name==="Region Dalarna");
const related='<div class="org-list"><a href="#/lan/20" class="org-result"><div class="org-avatar">20</div><div><h3>Dalarnas län</h3><p>Kommuner och regionala organisationer i länet.</p></div><span class="arrow">↗</span></a>'+(region?'<a href="#/organisation/'+region.id+'" class="org-result"><div class="org-avatar">RD</div><div><h3>Region Dalarna</h3><p>Regional vård och kollektivtrafik.</p></div><span class="arrow">↗</span></a>':'')+'</div>';
const tiles=d.groups.map(g=>'<button class="chip" type="button" data-topic="'+esc(g.id)+'" aria-controls="topic-'+esc(g.id)+'">'+esc(g.title)+'</button>').join("");
const main='<div class="profile-grid"><div>'
+'<section class="panel"><div class="label">Borlänge · Dalarnas län</div><h2>Vad behöver du hjälp med?</h2><p>Välj ett område eller sök efter en kommunal tjänst.</p><p>'+link(d.portal,"Kommunens e-tjänster","official-button")+'</p><div class="chips">'+tiles+'</div></section>'
+'<section class="panel"><h2>Sök bland kommunens tjänster</h2><div class="toolbar"><input type="search" id="borlange-search" aria-label="Sök bland Borlänges tjänster" placeholder="Sök exempelvis bygglov, trygghetslarm eller protokoll…" autocomplete="off"></div><div class="result-count" id="borlange-count" aria-live="polite">Sök efter ett ärende eller välj ett område nedan.</div><div class="org-list" id="borlange-results" hidden></div></section>'
+'<section class="panel"><h2>Tjänster och information</h2><p>Välj ett ämne för att visa tillhörande tjänster.</p></section>'
+'<div id="borlange-topics">'+categories+'</div>'
+'<section class="panel"><h2>Andra organisationer i Dalarna</h2>'+related+'</section>'
+'</div><aside><section class="panel"><h2>Borlänge kommun</h2><div class="label">Län</div><div class="detail"><a class="text-link" href="#/lan/20">Dalarnas län ↗</a></div><div class="label">Kommunkod</div><div class="detail">2081</div><div class="label">Officiell webbplats</div><div class="detail">'+link(d.url,"borlange.se")+'</div></section>'
+'<section class="panel"><h2>Kontakta kommunen</h2><div class="label">Servicecenter</div><div class="detail"><a class="text-link" href="tel:+4624374000">'+esc(d.contact.phone)+'</a></div><div class="label">E-post</div><div class="detail"><a class="text-link" href="mailto:'+esc(d.contact.email)+'">'+esc(d.contact.email)+'</a></div><div class="label">Besöksadress</div><div class="detail">'+esc(d.contact.address)+'</div>'+link(d.contact.url,"Kontakt och öppettider","official-button")+'</section></aside></div>';
return shell("Borlänge kommun","Kommunal service, e-tjänster, kontaktuppgifter och information.",'<a href="#/kommuner">Kommuner</a> / <a href="#/lan/20">Dalarnas län</a> / Borlänge',main);
}
function wire(){
const input=document.querySelector("#borlange-search");
const result=document.querySelector("#borlange-results");
const count=document.querySelector("#borlange-count");
if(!input||!result||!count)return;
const groups=window.OOJ_BORLANGE.groups;
const links=groups.flatMap(g=>g.links);
const openSection=id=>{
 const detail=document.getElementById("topic-"+id);
 if(!detail)return;
 detail.open=true;
 document.querySelectorAll(".municipality-topic").forEach(el=>{if(el!==detail)el.open=false;});
 detail.scrollIntoView({block:"start",behavior:"smooth"});
};
document.querySelectorAll("[data-topic]").forEach(button=>{
 button.addEventListener("click",()=>openSection(button.dataset.topic));
});
const update=()=>{
 const q=fold(input.value.trim());
 if(!q){
  result.hidden=true;
  result.innerHTML="";
  count.textContent="Sök efter ett ärende eller välj ett område nedan.";
  return;
 }
 const words=q.split(/\s+/).filter(Boolean);
 const found=links.filter(l=>words.every(word=>fold([l.title,l.description,l.type].join(" ")).includes(word)));
 result.hidden=false;
 count.textContent=found.length+" träffar";
 result.innerHTML=found.length?found.map(item).join(""):'<div class="empty"><h3>Inga träffar</h3><p>Prova ett annat sökord eller öppna kommunens e-tjänster.</p></div>';
};
input.addEventListener("input",update);
const section=new URLSearchParams(location.hash.split("?")[1]||"").get("sektion");
if(section&&groups.some(g=>g.id===section))openSection(section);
}
window.OOJ_BORLANGE_RENDER={render,wire};
})();