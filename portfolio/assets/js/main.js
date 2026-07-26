(()=>{
 const nav=document.querySelector('.nav');
 const toggle=document.querySelector('.menu-toggle');
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 nav?.addEventListener('click',e=>{if(e.target.matches('a')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));return;}
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -5%'});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();