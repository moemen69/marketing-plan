// Scroll-spy active nav link
const sections = document.querySelectorAll('main section, main .hero');
const navLinks = document.querySelectorAll('.nav-list a');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l=>l.classList.remove('active'));
      const active = document.querySelector(`.nav-list a[href="#${id}"]`);
      if(active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(s=>{ if(s.id) io.observe(s); });

// Week tabs
document.querySelectorAll('.week-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    const w = tab.dataset.week;
    document.querySelectorAll('.week-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.week-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.week-panel[data-week="${w}"]`).classList.add('active');
  });
});

// Animate budget bars on view
const barSection = document.getElementById('budget');
const barIo = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('.bar-fill').forEach(bar=>{
        bar.style.width = bar.style.width; // trigger transition (already set via inline style)
      });
      barIo.disconnect();
    }
  });
}, { threshold: 0.3 });
barIo.observe(barSection);

// Checklist interactivity
const items = document.querySelectorAll('.check-item');
const progressEl = document.getElementById('checklist-progress');
function updateProgress(){
  const done = document.querySelectorAll('.check-item.done').length;
  progressEl.textContent = `${done} / ${items.length} complete`;
}
items.forEach(item=>{
  item.addEventListener('click', ()=>{
    item.classList.toggle('done');
    item.querySelector('.box').textContent = item.classList.contains('done') ? '✓' : '';
    updateProgress();
  });
});
