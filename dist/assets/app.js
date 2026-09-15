const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus()}});
document.querySelectorAll('nav a').forEach(a=>{if(a.pathname===location.pathname)a.setAttribute('aria-current','page')});
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 document.querySelectorAll('[data-modes]').forEach(d=>{const selected=button.dataset.filter;const modes=d.querySelector('small').textContent.split(' · ');d.hidden=selected!=='all'&&!modes.includes(selected)});
}));
document.querySelector('#office-search')?.addEventListener('input',e=>{let count=0;document.querySelectorAll('.office-card').forEach(card=>{card.hidden=!normalize(card.dataset.search).includes(normalize(e.target.value));if(!card.hidden)count++});document.querySelector('#office-count').textContent=`${count} ${count===1?'oficina':'oficinas'}`;document.querySelector('#office-empty').hidden=count!==0});
const quoteForm=document.querySelector('#quote-form');
if(quoteForm){
 const params=new URLSearchParams(location.search);const dest=document.querySelector('#quote-destination');if([...dest.options].some(o=>o.value===params.get('destino')))dest.value=params.get('destino');
 const service=document.querySelector('#quote-service');if(params.get('servicio')==='recogida')service.value='Recogida en casa';if(params.get('servicio')==='exportacion'){service.value='Exportación desde Colombia';quoteForm.elements.origin.value='Colombia'}
 service.addEventListener('change',()=>{quoteForm.elements.origin.value=service.value==='Exportación desde Colombia'?'Colombia':'Estados Unidos'});
 quoteForm.addEventListener('submit',event=>{event.preventDefault();const d=new FormData(quoteForm);const destination=dest.options[dest.selectedIndex].textContent;const message=`Hola, Boxex. Quiero consultar una cotización.\nServicio: ${d.get('service')}\nOrigen: ${String(d.get('city')).trim()}, ${d.get('origin')}\nDestino: ${String(d.get('toCity')).trim()}, ${destination}\nContenido: ${String(d.get('content')).trim()}\nPeso aproximado: ${d.get('weight')?d.get('weight')+' lb':'por confirmar'}\nMedidas: ${d.get('dimensions')||'por confirmar'}\nPor favor, confirmen cobertura, costo completo, condiciones y tiempo estimado.`;
 document.querySelector('#quote-summary').textContent=message;document.querySelector('#quote-whatsapp').href='https://wa.me/573176410982?text='+encodeURIComponent(message);const result=document.querySelector('#quote-result');result.hidden=false;result.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});emit('quote_prepared',{service:String(d.get('service')),destination});
 });
}
function emit(name,detail={}){window.dispatchEvent(new CustomEvent('boxex:conversion',{detail:{event:name,...detail}}))}
document.querySelectorAll('a[href*="clientes.boxexpress.com"]').forEach(a=>a.addEventListener('click',()=>emit('casillero_click')));
document.querySelector('#tracking-form')?.addEventListener('submit',()=>emit('tracking_handoff'));
document.querySelector('#quote-whatsapp')?.addEventListener('click',()=>emit('quote_whatsapp_click'));
if(window.gsap&&window.ScrollTrigger&&!reduced.matches){gsap.registerPlugin(ScrollTrigger);document.querySelectorAll('.journey').forEach(el=>{const path=el.querySelector('.route-progress');const parcel=el.querySelector('.route-parcel');gsap.to(path,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:el,start:'top 65%',end:'bottom 70%',scrub:.7}});gsap.to(parcel,{rotation:18,y:-25,x:45,ease:'none',scrollTrigger:{trigger:el,start:'top 70%',end:'bottom 60%',scrub:1}})})}
if(document.querySelector('#scene'))import('./scene.js').catch(()=>{const b=document.querySelector('#motion-toggle');if(b)b.hidden=true});
