/* ===== SETTINGS: edit these ===== */
var VARA={
  email:'devarajnandini23@gmail.com',
  /* Paste your form service URL here (Formspree, Web3Forms, Getform...). Leave empty to use the email fallback. */
  formEndpoint:'',
  /* Extra fields some services need, e.g. {access_key:'YOUR_KEY'} for Web3Forms */
  formExtra:{}
};
/* ================================= */
(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
/* ---------- calm 3D dot field ---------- */
var kick=function(){},setShape=function(){},cur=0,run=false;
try{
var cv=$('#gl'),N=900,R=Math.random;
var renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
var dpr=Math.min(devicePixelRatio||1,2);renderer.setPixelRatio(dpr);
var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.z=11;
var group=new THREE.Group();group.rotation.set(.1,-.4,0);scene.add(group);
function mk(f){var a=new Float32Array(N*3);for(var i=0;i<N;i++){var p=f(i);a[i*3]=p[0];a[i*3+1]=p[1];a[i*3+2]=p[2]}return a}
function g(){return R()+R()+R()-1.5}
var shapes=[
 mk(function(){return[(R()-.5)*9,(R()-.5)*7,(R()-.5)*6]}),
 mk(function(i){var x=i%30,y=Math.floor(i/30);return[(x-14.5)*.28,(y-14.5)*.22,Math.sin(x*.4)*Math.cos(y*.4)*.5]}),
 mk(function(i){var k=i+.5,ph=Math.acos(1-2*k/N),th=Math.PI*(1+Math.sqrt(5))*k;return[3.1*Math.sin(ph)*Math.cos(th),3.1*Math.cos(ph),3.1*Math.sin(ph)*Math.sin(th)]}),
 mk(function(i){var t=i/N,a=t*Math.PI*16,r=.35+t*2.6;return[Math.cos(a)*r,-3.3+t*6.6,Math.sin(a)*r]}),
 mk(function(i){var k=i%6,r=.5+k*.62,a=(i/6)*.42+k;return[Math.cos(a)*r,Math.sin(a)*r,(k-2.5)*.16]}),
 (function(){var c=[];for(var j=0;j<7;j++)c.push([(R()-.5)*7,(R()-.5)*5,(R()-.5)*3]);return mk(function(i){var q=c[i%7];return[q[0]+g()*1.6,q[1]+g()*1.6,q[2]+g()*1.6]})})(),
 mk(function(i){var c=i%12,r=Math.floor(i/12),h=1+c*.48+(c%3)*.25;return[(c-5.5)*.64,-3+(r/75)*h*1.15,((c*7)%5-2)*.05+g()*.1]})
];
var pos=new Float32Array(N*3),size=new Float32Array(N),acc=new Float32Array(N),lag=new Float32Array(N);
for(var i=0;i<N;i++){size[i]=3+Math.pow(R(),3.2)*15;acc[i]=R()<.07?1:0;lag[i]=.012+R()*.04}
var geo=new THREE.BufferGeometry();
geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('aSize',new THREE.BufferAttribute(size,1));geo.setAttribute('aAcc',new THREE.BufferAttribute(acc,1));
var mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uInk:{value:new THREE.Color('#232321')},uAcc:{value:new THREE.Color('#E8590C')},uPx:{value:dpr}},
 vertexShader:'attribute float aSize;attribute float aAcc;uniform float uPx;varying float vA;varying float vD;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=aSize*uPx*(11.0/-mv.z);vA=aAcc;vD=clamp((mv.z+15.0)/8.0,.35,1.0);gl_Position=projectionMatrix*mv;}',
 fragmentShader:'uniform vec3 uInk;uniform vec3 uAcc;varying float vA;varying float vD;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float e=smoothstep(.5,.44,d);gl_FragColor=vec4(mix(uInk,uAcc,vA),e*vD);}'});
group.add(new THREE.Points(geo,mat));
function theme(){var s=getComputedStyle(document.documentElement);mat.uniforms.uInk.value.set(s.getPropertyValue('--ink').trim());mat.uniforms.uAcc.value.set(s.getPropertyValue('--acc').trim());kick()}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',theme);
function resize(){var w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
 var wide=w/h>1.15&&w>820,halfW=Math.tan(22.5*Math.PI/180)*11*cam.aspect;group.position.x=wide?halfW*.44:0;group.scale.setScalar(wide?.88:.78);kick()}
addEventListener('resize',resize);
kick=function(){if(!run){run=true;requestAnimationFrame(frame)}};
function frame(){var s=shapes[cur],md=0;
 for(var i=0;i<N;i++){var k=rm?1:lag[i],j=i*3;for(var a=0;a<3;a++){var d=s[j+a]-pos[j+a];pos[j+a]+=d*k;if(Math.abs(d)>md)md=Math.abs(d)}}
 geo.attributes.position.needsUpdate=true;renderer.render(scene,cam);
 if(md>.002)requestAnimationFrame(frame);else run=false}
setShape=function(n){cur=+n||0;kick()};
theme();resize();
}catch(err){}
/* ---------- shape follows what you are reading ---------- */
var rows=$$('.row');
function activate(el){rows.forEach(function(r){r.classList.toggle('on',r===el)});setShape(el&&el.dataset.shape||0)}
rows.forEach(function(r){r.addEventListener('mouseenter',function(){activate(r)});r.addEventListener('focus',function(){activate(r)})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
 if(e.target.classList.contains('row'))activate(e.target);else{activate(null);setShape(e.target.dataset.shape)}})},{rootMargin:'-45% 0px -45% 0px'});
$$('[data-shape]').forEach(function(el){io.observe(el)});
/* ---------- page transitions between pages ---------- */
var CUR=location.pathname.split('/').pop()||'index.html',busy=false;
var order=['index.html','services.html','work.html','reviews.html','pricing.html','about.html','contact.html'];
var names={'index.html':'Home','services.html':'Services','work.html':'Work','reviews.html':'Reviews','pricing.html':'Pricing','about.html':'About','contact.html':'Contact'};
var curtain=$('.curtain'),cl=$('b',curtain),cs=$('small',curtain),root=document.documentElement;
function enter(){if(rm)return;$$('.pg h1,.pg .hero p,.pg .lead,.pg .hero .cta,.pg .plan2,.pg .big,.pg .def,.pg .ct .fm,.pg .hint').forEach(function(el,i){
 el.animate([{opacity:0,transform:'translateY(40px)'},{opacity:1,transform:'none'}],{duration:850,delay:140+i*90,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'})})}
(function arrive(){var d=null;try{d=JSON.parse(sessionStorage.getItem('vt'));sessionStorage.removeItem('vt')}catch(x){}
 if(!d||rm){root.classList.remove('vt');if(curtain)curtain.style.display='none';enter();return}
 cs.textContent=d.n;cl.textContent=d.l;curtain.style.display='flex';root.classList.remove('vt');
 cl.animate([{transform:'translateY(45%)',opacity:0},{transform:'none',opacity:1}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});
 setTimeout(function(){var out=curtain.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:640,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});enter();
  out.onfinish=function(){curtain.style.display='none';out.cancel()}},420)})();
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download'))return;
 var href=a.getAttribute('href');if(!href||href.charAt(0)==='#'||/^[a-z]+:/i.test(href))return;
 var f=href.split('#')[0].split('?')[0];if(!names[f])return;
 if(f===CUR){if(href.indexOf('#')<0){e.preventDefault();scrollTo({top:0,behavior:rm?'auto':'smooth'})}return}
 if(busy){e.preventDefault();return}
 if(rm)return;
 e.preventDefault();busy=true;var d={n:'0'+(order.indexOf(f)+1)+' / 0'+order.length,l:names[f]};
 cs.textContent=d.n;cl.textContent=d.l;curtain.style.display='flex';
 var inn=curtain.animate([{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:560,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'});
 inn.onfinish=function(){try{sessionStorage.setItem('vt',JSON.stringify(d))}catch(x){}location.href=href};
 setTimeout(function(){busy=false},4000)});
addEventListener('pageshow',function(e){if(e.persisted){curtain.style.display='none';busy=false;root.classList.remove('vt')}});
/* ---------- offer popup and preselect ---------- */
var offer=$('.offer');
function seen(){try{return sessionStorage.getItem('offerSeen')}catch(x){return null}}
function closeOffer(){offer.classList.remove('show');try{sessionStorage.setItem('offerSeen','1')}catch(x){}}
if(offer&&!seen()&&CUR!=='contact.html'){setTimeout(function(){if(!seen()&&!busy)offer.classList.add('show')},5000)}
if(offer){$('.x',offer).addEventListener('click',closeOffer);addEventListener('keydown',function(e){if(e.key==='Escape'&&offer.classList.contains('show'))closeOffer()});$('.olnk',offer).addEventListener('click',closeOffer)}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-offer]');if(!a)return;try{sessionStorage.setItem('offer',a.dataset.offer)}catch(x){}if(offer)closeOffer()});
function preselect(){var v=null;try{v=sessionStorage.getItem('offer')}catch(x){}if(!v)return;var f=$('#pg-contact form');if(!f)return;f.elements['budget'].value=v==='one'?'One-page website, $500 flat':'Website design, $2,500 flat';$$('input[name=need]',f).forEach(function(c){if(c.value==='A new website')c.checked=true});try{sessionStorage.removeItem('offer')}catch(x){}}
/* ---------- Work: before/after sliders ---------- */
$$('.cmp').forEach(function(c){var inp=$('input',c),set=function(v){c.style.setProperty('--v',v+'%')},done=false;inp.addEventListener('input',function(){done=true;set(inp.value)});
 if(!rm){set(94);new IntersectionObserver(function(es,ob){if(!es[0].isIntersecting||done)return;ob.disconnect();var st=performance.now();(function tw(n){if(done)return;var p=Math.min((n-st)/1600,1),e=1-Math.pow(1-p,3),v=94-44*e;set(v);inp.value=v;if(p<1)requestAnimationFrame(tw)})(st)},{threshold:.6}).observe(c)}});
$$('.cmp').forEach(function(c){
 c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--px',(x-.5)*2);c.style.setProperty('--py',(y-.5)*2)});
 c.addEventListener('mouseleave',function(){c.style.setProperty('--px',0);c.style.setProperty('--py',0)});
 if(rm){c.classList.remove('pre')}else{new IntersectionObserver(function(es,ob){if(es[0].isIntersecting){c.classList.remove('pre');c.classList.add('play');ob.disconnect()}},{threshold:.4}).observe(c)}});
$$('.case .swb').forEach(function(b){b.addEventListener('click',function(){var h=b.dataset.hex,l=$('em',b);try{navigator.clipboard.writeText(h)}catch(x){}l.textContent='Copied';setTimeout(function(){l.textContent=h},1200)})});
/* ---------- Premium: samples ---------- */
function play(sm){sm.classList.remove('pre','play');void sm.offsetWidth;sm.classList.add('play')}
var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.target.classList.contains('pre'))play(e.target)})},{threshold:.5});
function setFilter(f){var w=$('#pg-work');if(!w)return;$$('.flt button',w).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===f)});$$('.grp',w).forEach(function(g){g.hidden=!(f==='all'||g.dataset.g===f)})}
$$('.flt button').forEach(function(b){b.addEventListener('click',function(){setFilter(b.dataset.f);var g=$('#pg-work .grp:not([hidden])');if(g)scrollTo({top:Math.max(0,g.getBoundingClientRect().top+scrollY-200),behavior:rm?'auto':'smooth'})})});
$$('.dz').forEach(function(d){var sm=$('.sm',d);
 $$('.swb',d).forEach(function(b){b.addEventListener('click',function(){var h=b.dataset.hex,l=$('em',b);try{navigator.clipboard.writeText(h)}catch(x){}l.textContent='Copied';setTimeout(function(){l.textContent=h},1200)})});
 if(!sm)return;sio.observe(sm);
 sm.addEventListener('mousemove',function(e){var r=sm.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;sm.style.setProperty('--mx',x*100+'%');sm.style.setProperty('--my',y*100+'%');sm.style.setProperty('--px',(x-.5)*2);sm.style.setProperty('--py',(y-.5)*2)});
 sm.addEventListener('mouseleave',function(){sm.style.setProperty('--px',0);sm.style.setProperty('--py',0)});
 $('.rp',d).addEventListener('click',function(){sm.classList.remove('play');sm.classList.add('pre');void sm.offsetWidth;play(sm)})});
/* ---------- Invitation sample: tabbed pages that scroll ---------- */
$$('.bd').forEach(function(d){var imgs=$$('.bi',d),tabs=$$('.bn button',d),vp=$('.bv',d),cur=-1,anim=null,timer=null,auto=true;
 function stop(){var o=anim;anim=null;clearTimeout(timer);if(o)setTimeout(function(){o.cancel()},800)}
 function next(){if(auto&&cur<imgs.length-1)show(cur+1,true)}
 function show(i,force){if(i===cur&&!force)return;stop();cur=i;
  imgs.forEach(function(im,k){im.classList.toggle('on',k===i)});tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i)});
  var im=imgs[i],over=im.offsetHeight-vp.clientHeight;
  if(over>4&&!rm){anim=im.animate([{transform:'translateY(0)'},{transform:'translateY('+(-over)+'px)'}],{duration:Math.max(6000,over*6),delay:900,easing:'cubic-bezier(.45,0,.25,1)',fill:'forwards'});anim.onfinish=function(){timer=setTimeout(next,1800)}}
  else if(!rm)timer=setTimeout(next,3600)}
 tabs.forEach(function(t,k){t.addEventListener('click',function(){auto=false;show(k,true)})});
 $('.rp',d).addEventListener('click',function(){auto=true;show(0,true)});
 new IntersectionObserver(function(es,ob){if(es[0].isIntersecting){ob.disconnect();show(0,true)}},{threshold:.45}).observe(vp)});
/* ---------- full screen view ---------- */
var fsb=$('.fsback'),fst=$('.fst',fsb),fsEl=null,fsPh=null;
function openFs(el,title){if(fsEl)return;fsEl=el;fsPh=document.createElement('div');fsPh.style.height=el.offsetHeight+'px';el.parentNode.insertBefore(fsPh,el);el.classList.add('fs');fsb.classList.add('on');fst.textContent=title;document.documentElement.style.overflow='hidden';$('.fsx',fsb).focus()}
function closeFs(){if(!fsEl)return;fsEl.classList.remove('fs');if(fsPh&&fsPh.parentNode)fsPh.parentNode.removeChild(fsPh);fsPh=null;fsEl=null;fsb.classList.remove('on');document.documentElement.style.overflow=''}
$$('.fsb').forEach(function(b){b.addEventListener('click',function(){var el=b.closest('.fr')||b.closest('.cmp'),card=b.closest('.dz')||b.closest('.case'),h=card&&$('h2,h3',card);openFs(el,h&&h.firstChild?h.firstChild.textContent.trim():'')})});
if(fsb){$('.fsx',fsb).addEventListener('click',closeFs);fsb.addEventListener('click',function(e){if(e.target===fsb)closeFs()})}
addEventListener('keydown',function(e){if(e.key==='Escape')closeFs()});
/* ---------- forms: send through your form service, with an email fallback ---------- */
function deliver(f,subject,fields,body,who){
 var done=$('.fdone',f),note=$('.fnote',f),btn=$('button[type=submit]',f),p=$('p',done),ta=$('textarea',done),cp=$('.cp',f);
 if(!done.dataset.fb)done.dataset.fb=p.innerHTML;
 var hp=f.elements['_gotcha'];if(hp&&hp.value)return;
 function fallback(){$('h3',done).textContent='Thanks, '+who+'. Your message is ready.';p.innerHTML=done.dataset.fb;ta.value=body;ta.hidden=false;cp.hidden=false;done.hidden=false;note.textContent='';done.scrollIntoView({behavior:'smooth',block:'center'});
  location.href='mailto:'+VARA.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)}
 if(!VARA.formEndpoint){fallback();return}
 var label=btn.textContent;btn.disabled=true;btn.textContent='Sending...';
 var payload=Object.assign({},VARA.formExtra,fields,{_subject:subject,message:body});
 fetch(VARA.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
  .then(function(r){if(!r.ok)throw new Error('send failed');return r.json().catch(function(){return {}})})
  .then(function(){$('h3',done).textContent='Thanks, '+who+'. Your message has been sent.';p.textContent='I reply within two working days. A copy of what you sent is below.';ta.value=body;ta.hidden=false;cp.hidden=false;done.hidden=false;note.textContent='';btn.disabled=false;btn.textContent=label;f.reset();done.scrollIntoView({behavior:'smooth',block:'center'})})
  .catch(function(){btn.disabled=false;btn.textContent=label;fallback()})}
function copyBtn(f){var cp=$('.cp',f);cp.addEventListener('click',function(){var t=$('.fdone textarea',f);t.select();try{navigator.clipboard.writeText(t.value)}catch(x){}cp.textContent='Copied'})}
/* ---------- Reviews page ---------- */
(function(){var pg=$('#pg-reviews');if(!pg)return;var data=[];try{data=JSON.parse($('#reviews-data').textContent)||[]}catch(x){}
 function el(t,c,tx){var e=document.createElement(t);if(c)e.className=c;if(tx!=null)e.textContent=tx;return e}
 function stars(n){return '\u2605\u2605\u2605\u2605\u2605'.slice(0,n)+'\u2606\u2606\u2606\u2606\u2606'.slice(0,5-n)}
 if(data.length){var body=$('.rvl-body',pg),sum=$('.rvl-sum',pg),avg=data.reduce(function(s,r){return s+(+r.rating||0)},0)/data.length;
  sum.appendChild(el('b',null,avg.toFixed(1)));sum.appendChild(el('span','stx',stars(Math.round(avg))));sum.appendChild(el('span',null,data.length+(data.length===1?' review':' reviews')));
  body.textContent='';var grid=el('div','rv-grid');
  data.forEach(function(r){var c=el('article','rcard');c.appendChild(el('div','stx',stars(Math.max(0,Math.min(5,+r.rating||0)))));if(r.early)c.appendChild(el('span','tg','Early client'));c.appendChild(el('p',null,'\u201C'+r.text+'\u201D'));
   var f=el('footer');f.appendChild(el('b',null,r.name));if(r.business)f.appendChild(el('span',null,r.business));
   var line=[r.date,r.source].filter(Boolean).join(' \u00B7 ');if(r.url){var a=el('a',null,line||'View original');a.href=r.url;a.target='_blank';a.rel='noopener';f.appendChild(a)}else if(line)f.appendChild(el('span',null,line));
   c.appendChild(f);grid.appendChild(c)});body.appendChild(grid)}
 var f=$('form',pg);if(!f)return;copyBtn(f);
 f.addEventListener('submit',function(e){e.preventDefault();var l=f.elements,n=l['name'].value.trim(),t=l['text'].value.trim(),rt=$('input[name=rating]:checked',f),note=$('.fnote',f);
  if(!n||!t||!rt||!l['ok'].checked){note.textContent='Please add your name, a star rating and your review, and tick the permission box.';return}
  var body='Name: '+n+'\nBusiness: '+l['biz'].value+'\nRating: '+rt.value+' out of 5\nPermission to publish with name and business: yes\n\n'+t;
  deliver(f,'Review from '+n,{name:n,business:l['biz'].value,rating:rt.value,review:t,permission:'yes'},body,n.split(' ')[0])})})();
/* ---------- Contact: enquiry form ---------- */
(function(){var f=$('#pg-contact form');if(!f)return;preselect();copyBtn(f);
 f.addEventListener('submit',function(e){e.preventDefault();var el=f.elements,n=el['name'].value.trim(),c=el['contact'].value.trim(),note=$('.fnote',f);
  if(!n||!c){note.textContent='Please add your name and an email or phone number so I can reply.';(n?el['contact']:el['name']).focus();return}
  var needs=$$('input[name=need]:checked',f).map(function(x){return x.value}).join(', ')||'Not sure yet';
  var body='Name: '+n+'\nEmail or phone: '+c+'\nBusiness: '+el['biz'].value+'\nWebsite: '+el['site'].value+'\nNeeds: '+needs+'\nBudget: '+el['budget'].value+'\n\n'+el['msg'].value;
  deliver(f,'New project enquiry from '+n,{name:n,contact:c,business:el['biz'].value,website:el['site'].value,needs:needs,budget:el['budget'].value,details:el['msg'].value},body,n.split(' ')[0])})})();
})();
