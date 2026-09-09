const BOOKING='https://dikidi.net/2144174';
const works=['00_blurred_girl_first.webp','222e5ba9-b172-55a2-88f9-ee7b1c3a758a.webp','2f7c8fdb-b885-57c3-b59b-8b64612a43c7.webp','63637af1-c048-5eeb-a207-55d6e5bb7d89.webp','a937da8a-7189-5a7d-9c34-edce2654341a.webp','c0227806-1078-5a6c-ab05-5a9fffa2c998.webp','IMG_2947.webp','IMG_2948.webp','IMG_2949.webp','IMG_2950.webp','IMG_2952.webp','IMG_2953.webp','IMG_2954.webp','IMG_2955.webp','IMG_2946.webp','IMG_2951.webp'];
const services={
cut:[
{name:'Стрижка женская',price:'3 000 ₽',time:'90 мин',description:''},
{name:'Стрижка — ровный срез',price:'1 000 ₽',time:'30 мин',description:''},
{name:'Стрижка с мытьём головы',price:'1 800 ₽',time:'40 мин',description:''},
{name:'Моделирование челки',price:'1 000 ₽',time:'30 мин',description:''},
{name:'Коррекция челки',price:'500 ₽',time:'20 мин',description:''},
{name:'Полировка волос',price:'3 000 ₽',time:'',description:'Устранение секущихся концов по полотну волос ножницами с сохранением длины. Стрижка концов — дополнительно 1 000 ₽.'}
],
color:[
{name:'Окрашивание корней 1–2 см',price:'3 500 ₽',time:'90 мин',description:''},
{name:'Тон в тон / тонирование — короткие волосы',price:'4 000–4 500 ₽',time:'90 мин',description:''},
{name:'Тон в тон / тонирование — средняя длина',price:'5 000–5 500 ₽',time:'120 мин',description:''},
{name:'Тон в тон / тонирование — длинные волосы',price:'5 500–6 500 ₽',time:'120 мин',description:''},
{name:'Глазирование — средняя длина',price:'4 500–5 500 ₽',time:'',description:''},
{name:'Глазирование — длинные волосы',price:'5 500–6 500 ₽',time:'',description:''},
{name:'Total blond — короткая длина',price:'7 500 ₽',time:'3 ч',description:'Блондирование корней / тонирование.'},
{name:'Total blond — средняя длина',price:'8 000 ₽',time:'3 ч',description:'Блондирование корней / тонирование.'},
{name:'Total blond — длинные волосы',price:'9 000 ₽',time:'3 ч',description:'Блондирование корней / тонирование.'},
{name:'Контуринг / осветление краевой линии',price:'9 000–12 000 ₽',time:'',description:'Осветление краевой линии волос с последующим тонированием.'},
{name:'Затемнение блонда / репигментация — короткая длина',price:'7 000 ₽',time:'2 ч',description:'Восстановление натурального цвета волос.'},
{name:'Затемнение блонда / репигментация — средняя длина',price:'8 000 ₽',time:'2 ч',description:'Восстановление натурального цвета волос.'},
{name:'Затемнение блонда / репигментация — длинные волосы',price:'9 000 ₽',time:'2 ч',description:'Восстановление натурального цвета волос.'},
{name:'Выход из чёрного / тёмного',price:'10 000–20 000 ₽',time:'5–6 ч',description:''},
{name:'Мелирование + тонирование — короткая длина',price:'от 7 500 ₽',time:'',description:'Осветление, липидный уход, тонирование и укладка.'},
{name:'Мелирование + тонирование — средняя длина',price:'от 8 500 ₽',time:'',description:'Осветление, липидный уход, тонирование и укладка.'},
{name:'Мелирование + тонирование — длинные волосы',price:'от 10 000 ₽',time:'',description:'Осветление, липидный уход, тонирование и укладка.'},
{name:'Комплекс: стрижка + окрашивание — короткие волосы',price:'7 000–7 500 ₽',time:'',description:''},
{name:'Комплекс: стрижка + окрашивание — средняя длина',price:'8 000–8 500 ₽',time:'',description:''},
{name:'Комплекс: стрижка + окрашивание — длинные волосы',price:'8 500–9 000 ₽',time:'',description:''}
],
care:[
{name:'Аминокератиновая реконструкция',price:'5 000 ₽',time:'',description:''},
{name:'Протеиновое насыщение — до плеч',price:'3 000 ₽',time:'',description:''},
{name:'Протеиновое насыщение — ниже плеч',price:'3 500 ₽',time:'',description:''},
{name:'Кератиновая реконструкция — до плеч',price:'3 000 ₽',time:'',description:''},
{name:'Кератиновая реконструкция — ниже плеч',price:'3 500 ₽',time:'',description:''},
{name:'Коллагеновый уход — до плеч',price:'2 000 ₽',time:'',description:''},
{name:'Коллагеновый уход — ниже плеч',price:'2 500 ₽',time:'',description:''},
{name:'Spa Keratin от Dr.Sorbie — до плеч',price:'5 000 ₽',time:'',description:''},
{name:'Spa Keratin от Dr.Sorbie — ниже плеч',price:'5 500 ₽',time:'',description:''}
],
style:[
{name:'Локоны на брашинг — до плеч',price:'2 000 ₽',time:'',description:''},
{name:'Локоны на брашинг — ниже плеч',price:'2 500 ₽',time:'',description:''},
{name:'Дневная укладка — до плеч',price:'2 000 ₽',time:'',description:''},
{name:'Дневная укладка — ниже плеч',price:'2 500 ₽',time:'',description:''},
{name:'Коктейльная укладка — до плеч',price:'3 000 ₽',time:'',description:'Мытьё головы, укладка на горячий инструмент с использованием стайлинговых средств.'},
{name:'Коктейльная укладка — ниже плеч',price:'3 500 ₽',time:'',description:'Мытьё головы, укладка на горячий инструмент с использованием стайлинговых средств.'}
]};
const reviews=[
{name:'Дарья',meta:'26 июля 2026 · Блонд',text:'Огромное спасибо за идеальный блонд! Цвет получился именно таким, как я мечтала — чистым, благородным и без желтизны. При этом волосы остались мягкими и живыми.'},
{name:'Ольга',meta:'08 июня 2026 · Стрижка и уход',text:'Огромное спасибо мастеру Юлии за профессионализм и отличную работу. Волосы напитались, стали шелковистыми, блестящими и плотными. Спасибо за внимательное отношение.'},
{name:'Екатерина',meta:'20 марта 2026 · Тонирование',text:'Юлия учла все мои пожелания по цвету, подобрала идеальный оттенок. Уходовая процедура заметно улучшила состояние волос. Рекомендую Юлю как настоящего профессионала.'},
{name:'Анастасия',meta:'07 марта 2026 · Стрижка и окрашивание',text:'Юлия, как всегда на высоте! Стрижка и окраска очень классные! Я в восторге! Спасибо огромное!'},
{name:'Анна',meta:'21 февраля 2026 · Окрашивание корней',text:'Если вы переживаете за ваши волосы — вам к данному мастеру, и все переживания пройдут. А волосы только скажут спасибо.'},
{name:'Анна',meta:'19 апреля 2026 · Стрижка',text:'Всегда внимательно выслушает все мои пожелания и предложит несколько вариантов, как будет лучше. Работа выполнена безупречно. Особенно хочу отметить профессионализм и аккуратность.'}
];

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

// Menu — same compact interaction as claytone-current.
const menuButton=$('#menuButton'),mobileNavigation=$('#mobileNavigation'),menuWrap=$('#menuWrap');
function closeMenu(){if(!menuButton||!mobileNavigation)return;menuButton.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');mobileNavigation.hidden=true}
menuButton?.addEventListener('click',()=>{const open=mobileNavigation.hidden;mobileNavigation.hidden=!open;menuButton.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open))});
$$('#mobileNavigation a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('pointerdown',e=>{if(menuWrap&&!menuWrap.contains(e.target))closeMenu()});

// Reveal-on-scroll from the source template.
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -10% 0px'});
$$('.mct-reveal').forEach(el=>revealObserver.observe(el));

// Portfolio lead slider.
const lead=$('#portfolioLead'),leadDots=$$('[data-lead]');
function updateLead(){if(!lead)return;const center=lead.getBoundingClientRect().left+lead.clientWidth/2;let best=0,dist=Infinity;Array.from(lead.children).forEach((el,i)=>{const r=el.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-center);if(d<dist){dist=d;best=i}});leadDots.forEach((d,i)=>d.classList.toggle('is-active',i===best))}
lead?.addEventListener('scroll',updateLead,{passive:true});
leadDots.forEach((dot,i)=>dot.addEventListener('click',()=>{const card=lead?.children[i];if(!lead||!card)return;const a=lead.getBoundingClientRect(),b=card.getBoundingClientRect();lead.scrollTo({left:lead.scrollLeft+(b.left-a.left)-(lead.clientWidth-card.clientWidth)/2,behavior:'smooth'})}));

// Exact claytone-current film-strip markup, populated with Julia's work.
const filmTrack=$('#filmTrack');
const filmImages=works.slice(0,12),modules=[filmImages.slice(0,4),filmImages.slice(4,8),filmImages.slice(8,12)];
if(filmTrack){for(let set=0;set<3;set++){const setEl=document.createElement('div');setEl.className='dct-gallery-set';setEl.setAttribute('aria-hidden',set===1?'false':'true');modules.forEach((arr,m)=>{const mod=document.createElement('div');mod.className=`dct-gallery-module dct-gallery-module-${m+1}`;arr.forEach((src,i)=>{const b=document.createElement('button');b.className=`dct-film-frame dct-film-frame-${i+1} js-work`;b.type='button';b.dataset.src=src;b.innerHTML=`<img src="./${src}" alt="Работа Юлии Ролевой" loading="lazy" draggable="false">`;mod.append(b)});setEl.append(mod)});filmTrack.append(setEl)}}
let filmOffset=0,filmPaused=false,lastFilm=performance.now();
function animateFilm(t){if(filmTrack){const sets=$$('.dct-gallery-set',filmTrack),w=sets[1]?sets[1].offsetLeft-sets[0].offsetLeft:0;if(w){if(!filmOffset)filmOffset=-w;if(!filmPaused){filmOffset-=Math.min(t-lastFilm,34)*.026;if(filmOffset<=-w*2)filmOffset+=w;if(filmOffset>0)filmOffset-=w}filmTrack.style.transform=`translate3d(${filmOffset}px,0,0)`}}lastFilm=t;requestAnimationFrame(animateFilm)}requestAnimationFrame(animateFilm);
$('#filmViewport')?.addEventListener('mouseenter',()=>filmPaused=true);$('#filmViewport')?.addEventListener('mouseleave',()=>filmPaused=false);

// Services.
let activeCategory='cut',expanded=false;
const serviceList=$('#serviceList'),moreServices=$('#moreServices');
function renderServices(){if(!serviceList)return;const all=services[activeCategory]||[],shown=expanded?all:all.slice(0,5);serviceList.innerHTML=shown.map((s,i)=>`<article class="mct-service-row"><div class="mct-service-name"><strong>${s.name}</strong>${s.description?`<p class="dct-service-description">${s.description}</p>`:''}${s.time?`<small>${s.time}</small>`:''}</div><div class="mct-service-action"><b>${s.price}</b><a href="${BOOKING}" target="_blank" rel="noopener noreferrer">Записаться →</a></div></article>`).join('');if(moreServices){const remain=all.length-5;moreServices.hidden=remain<=0;moreServices.classList.toggle('is-open',expanded);moreServices.setAttribute('aria-expanded',String(expanded));moreServices.firstChild.textContent=expanded?'Свернуть услуги ':`Показать ещё ${remain} услуг `}}
$$('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.category;expanded=false;$$('[data-category]').forEach(x=>x.classList.toggle('is-active',x===btn));renderServices()}));
moreServices?.addEventListener('click',()=>{expanded=!expanded;renderServices()});renderServices();

// Gallery and lightbox.
const galleryOverlay=$('#galleryOverlay'),galleryGrid=$('#galleryGrid'),lightbox=$('#lightbox'),lightboxImage=$('#lightboxImage'),lightboxCounter=$('#lightboxCounter');let lightboxIndex=0;
if(galleryGrid)galleryGrid.innerHTML=works.map((src,i)=>`<button class="mct-gallery-image js-work" type="button" data-src="${src}" aria-label="Открыть работу ${i+1}"><img src="./${src}" alt="Работа Юлии Ролевой ${i+1}" loading="${i>4?'lazy':'eager'}"></button>`).join('');
function lockBody(lock){document.body.style.overflow=lock?'hidden':''}
function openGallery(){if(!galleryOverlay)return;galleryOverlay.hidden=false;lockBody(true)}function closeGallery(){if(!galleryOverlay)return;galleryOverlay.hidden=true;if(lightbox?.hidden!==false)lockBody(false)}
function showLightbox(src){const idx=works.indexOf(src);lightboxIndex=idx>=0?idx:0;if(lightboxImage)lightboxImage.src=`./${works[lightboxIndex]}`;if(lightboxCounter)lightboxCounter.textContent=`${String(lightboxIndex+1).padStart(2,'0')} / ${String(works.length).padStart(2,'0')}`;if(lightbox)lightbox.hidden=false;lockBody(true)}
function stepLightbox(dir){lightboxIndex=(lightboxIndex+dir+works.length)%works.length;showLightbox(works[lightboxIndex])}
function closeLightbox(){if(!lightbox)return;lightbox.hidden=true;if(galleryOverlay?.hidden!==false)lockBody(false)}
$('#galleryOpen')?.addEventListener('click',openGallery);$('#galleryClose')?.addEventListener('click',closeGallery);$('#lightboxClose')?.addEventListener('click',closeLightbox);$('#lightboxPrev')?.addEventListener('click',e=>{e.stopPropagation();stepLightbox(-1)});$('#lightboxNext')?.addEventListener('click',e=>{e.stopPropagation();stepLightbox(1)});
document.addEventListener('click',e=>{const b=e.target.closest?.('.js-work');if(b?.dataset.src)showLightbox(b.dataset.src)});galleryOverlay?.addEventListener('click',e=>{if(e.target===galleryOverlay)closeGallery()});lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(lightbox?.hidden===false)closeLightbox();else if(galleryOverlay?.hidden===false)closeGallery()}if(lightbox?.hidden===false&&e.key==='ArrowLeft')stepLightbox(-1);if(lightbox?.hidden===false&&e.key==='ArrowRight')stepLightbox(1)});

// Reviews — same endless moving rail idea as claytone-current, draggable on desktop/mobile.
const reviewTrack=$('#reviewTrack'),reviewViewport=$('#reviewViewport');
if(reviewTrack){for(let set=0;set<5;set++){const group=document.createElement('div');group.className='mct-review-set';group.setAttribute('aria-hidden',set===2?'false':'true');reviews.forEach(r=>{const a=document.createElement('a');a.className='mct-review-card';a.href=BOOKING;a.target='_blank';a.rel='noopener noreferrer';a.innerHTML=`<span>★★★★★</span><blockquote>«${r.text}»</blockquote><small>${r.name} · ${r.meta} · Dikidi</small><i>Записаться →</i>`;group.append(a)});reviewTrack.append(group)}}
let reviewOffset=0,reviewPaused=false,reviewSetWidth=0,reviewPointer=null,reviewStart=0,reviewBase=0,lastReview=performance.now();
function normalizeReview(){if(!reviewSetWidth)return;while(reviewOffset<=-reviewSetWidth*3)reviewOffset+=reviewSetWidth*2;while(reviewOffset>-reviewSetWidth)reviewOffset-=reviewSetWidth*2}
function measureReviews(){const first=reviewTrack?.querySelector('.mct-review-set');if(first){reviewSetWidth=first.getBoundingClientRect().width;if(!reviewOffset)reviewOffset=-reviewSetWidth*2}}
function animateReviews(t){if(reviewTrack){if(!reviewPaused){reviewOffset-=Math.min(t-lastReview,34)*.032;normalizeReview()}reviewTrack.style.transform=`translate3d(${reviewOffset}px,0,0)`}lastReview=t;requestAnimationFrame(animateReviews)}
measureReviews();window.addEventListener('resize',measureReviews);requestAnimationFrame(animateReviews);
reviewViewport?.addEventListener('pointerdown',e=>{reviewPaused=true;reviewPointer=e.clientX;reviewStart=e.clientX;reviewBase=reviewOffset;reviewViewport.setPointerCapture?.(e.pointerId)});reviewViewport?.addEventListener('pointermove',e=>{if(reviewPointer===null)return;reviewOffset=reviewBase+(e.clientX-reviewStart);normalizeReview()});function resumeReview(){reviewPointer=null;reviewPaused=false}reviewViewport?.addEventListener('pointerup',resumeReview);reviewViewport?.addEventListener('pointercancel',resumeReview);
function stepReviews(dir){const card=reviewViewport?.querySelector('.mct-review-card'),step=(card?.getBoundingClientRect().width||400)+16;reviewOffset-=dir*step;normalizeReview()}$('#reviewsPrev')?.addEventListener('click',()=>stepReviews(-1));$('#reviewsNext')?.addEventListener('click',()=>stepReviews(1));

// Moscow opening status: Mon–Sat 10:00–20:00, Sunday closed.
function updateOpenStatus(){const status=$('#openStatus');if(!status)return;const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()),wd=parts.find(x=>x.type==='weekday')?.value,h=+parts.find(x=>x.type==='hour')?.value||0,m=+parts.find(x=>x.type==='minute')?.value||0,minutes=h*60+m,isSunday=wd==='Sun',open=!isSunday&&minutes>=600&&minutes<1200;status.classList.toggle('is-open',open);status.classList.toggle('is-closed',!open);status.innerHTML=`<i aria-hidden="true"></i>${open?'Открыто до 20:00':isSunday?'Сегодня выходной':'Закрыто до 10:00'}`}
updateOpenStatus();setInterval(updateOpenStatus,60000);

// Sticky booking: visible after the first screen and hidden at the final booking block.
const stickyWrap=$('#stickyWrap'),hero=$('.mct-hero'),finalBlock=$('.mct-visit-booking');function updateSticky(){if(!stickyWrap||!hero)return;const afterHero=window.scrollY>Math.max(220,hero.offsetHeight*.45),finalVisible=finalBlock?finalBlock.getBoundingClientRect().top<window.innerHeight*.85:false,visible=afterHero&&!finalVisible&&!galleryOverlay?.hidden===false;stickyWrap.classList.toggle('is-visible',visible);stickyWrap.setAttribute('aria-hidden',String(!visible))}window.addEventListener('scroll',updateSticky,{passive:true});window.addEventListener('resize',updateSticky);updateSticky();
