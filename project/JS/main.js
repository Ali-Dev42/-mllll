/* =========================================================
   LOVING HOMES — MAIN SCRIPTS
========================================================= */

/* CURSOR */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  if(cur){ cur.style.left = e.clientX+'px'; cur.style.top = e.clientY+'px'; }
  setTimeout(() => { if(ring){ ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px'; } }, 60);
});

/* TOAST */
function toast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* LANG — Arabic only mode (button removed, keep function safe) */
let lang = 'ar';
function toggleLang() {
  lang = lang === 'ar' ? 'en' : 'ar';
  const h = document.getElementById('R');
  if(h){ h.setAttribute('lang', lang); h.setAttribute('dir', lang==='ar'?'rtl':'ltr'); }
  const lb = document.getElementById('langBtn');
  if(lb) lb.textContent = lang==='ar' ? 'EN' : 'عر';
  toast(lang==='ar' ? 'تم التبديل إلى العربية 🇸🇦' : 'Switched to English 🇬🇧');
}

/* SMOOTH SCROLL */
function G(id) {
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* INTERCEPT ALL ANCHOR CLICKS FOR SMOOTH SCROLL */
document.addEventListener('click', function(e) {
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  if(!id) return;
  const target = document.getElementById(id);
  if(target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* NAV SCROLL EFFECTS */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const goTop = document.getElementById('goTop');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if(goTop) goTop.classList.toggle('vis', window.scrollY > 500);

  // Active nav link highlight
  ['intro','vid-sec','services','packages','gallery','reviews','contact'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    const r = el.getBoundingClientRect();
    if(r.top < 140 && r.bottom > 0) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#'+id);
      });
    }
  });
});

/* MOBILE DRAWER */
function toggleDrawer() {
  const d = document.getElementById('navDrawer');
  if(d) d.classList.toggle('open');
}

/* MODALS */
function openModal(id) {
  const m = document.getElementById(id);
  if(m){ m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if(m){ m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') { closeModal('callModal'); closeModal('bookModal'); closeLB(); }
});

/* MARQUEE */
const mqItems = ['فندق كلاب فاخر','رعاية مميزة','فريق بيطري 24/7','هونج كونج','تحديثات يومية','كلاب سعيدة وآمنة','صالة حلاقة ومنتجع','نزهات الغابة'];
const mq = document.getElementById('mq');
if(mq) {
  [...mqItems, ...mqItems].forEach(t => {
    const d = document.createElement('div');
    d.className = 'm-item';
    d.textContent = t;
    mq.appendChild(d);
  });
}

/* VIDEO */
const vid = document.getElementById('mainVid');
const vOvl = document.getElementById('vidOverlay');
const vPBtn = document.getElementById('vPlayBtn');
const vMBtn = document.getElementById('vMuteBtn');
const vFill = document.getElementById('vFill');
const vProg = document.getElementById('vProg');

function toggleVid() {
  if(!vid) return;
  if(vid.paused) {
    vid.play().catch(()=>{});
    if(vOvl) vOvl.classList.add('hidden');
    if(vPBtn) vPBtn.textContent = '⏸';
  } else {
    vid.pause();
    if(vOvl) vOvl.classList.remove('hidden');
    if(vPBtn) vPBtn.textContent = '▶';
  }
}
function toggleMute() {
  if(!vid) return;
  vid.muted = !vid.muted;
  if(vMBtn) vMBtn.textContent = vid.muted ? '🔇' : '🔊';
}
function fsVid() {
  if(!vid) return;
  if(vid.requestFullscreen) vid.requestFullscreen();
  else if(vid.webkitRequestFullscreen) vid.webkitRequestFullscreen();
}
if(vid) {
  vid.addEventListener('timeupdate', () => {
    if(vid.duration && vFill) vFill.style.width = (vid.currentTime / vid.duration * 100) + '%';
  });
  vid.addEventListener('ended', () => {
    if(vOvl) vOvl.classList.remove('hidden');
    if(vPBtn) vPBtn.textContent = '▶';
  });
  vid.play().catch(() => {});
}
if(vProg) {
  vProg.addEventListener('click', e => {
    if(!vid || !vid.duration) return;
    const r = vProg.getBoundingClientRect();
    vid.currentTime = ((e.clientX - r.left) / r.width) * vid.duration;
  });
}
// Auto-play video when visible
if(vid) {
  const vidObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        vid.play().catch(()=>{});
        if(vOvl) vOvl.classList.add('hidden');
        if(vPBtn) vPBtn.textContent = '⏸';
      } else {
        vid.pause();
      }
    });
  }, { threshold: 0.3 });
  vidObs.observe(vid);
}

/* PACKAGES FILTER */
function filterPkg(t, btn) {
  document.querySelectorAll('.pkg-tab').forEach(b => b.classList.remove('on'));
  if(btn) btn.classList.add('on');
  document.querySelectorAll('.pkg-card').forEach(c => {
    c.style.display = (t === 'all' || c.dataset.type === t) ? '' : 'none';
  });
}
function choosePkg(t) {
  openModal('bookModal');
  setTimeout(() => {
    document.querySelectorAll('.bk-pkg-opt').forEach(o => o.classList.remove('sel'));
    const opt = document.querySelector(`.bk-pkg-opt[data-p="${t}"]`);
    if(opt) opt.classList.add('sel');
    bkData.pkg = t;
  }, 200);
}

/* GALLERY LIGHTBOX */
function openLB(el) {
  const img = el.querySelector('img');
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lb-img');
  if(lb && lbImg && img) {
    lbImg.src = img.src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeLB() {
  const lb = document.getElementById('lb');
  if(lb) { lb.classList.remove('open'); document.body.style.overflow = ''; }
}

/* REVIEWS SLIDER */
let revCur = 0;
const revCards = document.querySelectorAll('.rev-card');
const revDotsEl = document.getElementById('revDots');
const REV_VIS = 3;
if(revDotsEl && revCards.length) {
  revCards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'rdot' + (i === 0 ? ' on' : '');
    d.onclick = () => goRev(i);
    revDotsEl.appendChild(d);
  });
}
function goRev(n) {
  revCur = Math.max(0, Math.min(n, revCards.length - REV_VIS));
  const slider = document.getElementById('revSlider');
  if(slider) slider.style.transform = `translateX(${revCur * -358}px)`;
  document.querySelectorAll('.rdot').forEach((d, i) => d.classList.toggle('on', i === revCur));
}
function revSlide(d) { goRev(revCur + d); }

/* CONTACT FORM */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit-main');
  if(!btn) return;
  btn.textContent = '⏳ جارٍ الإرسال...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ تم الإرسال!';
    toast('شكراً! سنتواصل معك قريباً 🐾');
    setTimeout(() => {
      btn.textContent = 'إرسال الطلب 🐾';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1500);
}

/* BOOKING MODAL */
let bkData = { pkg: 'premium', in: '', out: '', name: '', phone: '' };
function selPkg(el, p) {
  document.querySelectorAll('.bk-pkg-opt').forEach(o => o.classList.remove('sel'));
  if(el) el.classList.add('sel');
  bkData.pkg = p;
}
function bkStep(n) {
  if(n === 3) {
    const i = document.getElementById('bkIn');
    const o = document.getElementById('bkOut');
    const nm = document.getElementById('bkName');
    if(!i || !o || !nm || !i.value || !o.value || !nm.value.trim()) {
      toast('يرجى ملء جميع الحقول');
      return;
    }
    bkData.in = i.value; bkData.out = o.value;
    bkData.name = nm.value.trim();
    const ph = document.getElementById('bkPhone');
    bkData.phone = ph ? ph.value : '';
    const names = { premium:'المميزة', classic:'الكلاسيكية', day:'اليوم', custom:'مخصصة' };
    const summary = document.getElementById('bkSummary');
    if(summary) summary.innerHTML = `
      <div class="bk-row"><span class="l">الحزمة</span><span class="v">${names[bkData.pkg]||bkData.pkg}</span></div>
      <div class="bk-row"><span class="l">الوصول</span><span class="v">${bkData.in}</span></div>
      <div class="bk-row"><span class="l">المغادرة</span><span class="v">${bkData.out}</span></div>
      <div class="bk-row"><span class="l">الاسم</span><span class="v">${bkData.name}</span></div>
      <div class="bk-row"><span class="l">الهاتف</span><span class="v">${bkData.phone||'—'}</span></div>`;
  }
  for(let i = 1; i <= 3; i++) {
    const s = document.getElementById('bs'+i);
    const p = document.getElementById('bp'+i);
    if(s){ s.classList.toggle('cur', i===n); s.classList.toggle('done', i<n); }
    if(p) p.classList.toggle('show', i===n);
  }
  const bp4 = document.getElementById('bp4');
  if(n === 4 && bp4) bp4.classList.add('show');
}
function confirmBk() {
  bkStep(4);
  toast('🎉 تم إرسال طلب الحجز!');
}

// Set min dates for booking
const td = new Date().toISOString().split('T')[0];
['bkIn','bkOut'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.min = td;
});
const bkInEl = document.getElementById('bkIn');
if(bkInEl) bkInEl.addEventListener('change', () => {
  const o = document.getElementById('bkOut');
  if(o) o.min = bkInEl.value;
});

/* REVEAL ON SCROLL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  observer.observe(el);
});

// Init booking modal on first step
bkStep(1);